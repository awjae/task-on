'use client';

import { useState } from 'react';
import { Button, styled, Typography } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StyledPage } from '../styles';
import { usePathname } from 'next/navigation';
import NavigationBar from '../../_components/navigation-bar';
import { useTranslations } from 'next-intl';
import BigCalendar from './_components/big-calendar';
import { Event } from 'react-big-calendar';

const WrapperDiv = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 16px;

  &>div {
    display: flex;
    width: 100%;
    gap: 12px;
  }

  input {
    border: none;
    border-bottom: 2px solid ${theme.palette.divider};
    border-radius: 0;
    font-size: 14px;
    background: transparent;
    flex-grow: 1;

    &:focus {
      outline: none;
      border-bottom-color: ${theme.palette.taskOn.lightGreen};
    }
  }

  button {
    height: 30px;
    background-color: ${theme.palette.taskOn.lightGreen};
    text-align: center;
    & > span {
      margin-right: 0;
      margin-left: 0;
    }
    &:hover {
      background: ${theme.palette.taskOn.oliveGreen};
    }
  }
`);

export default function Index() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [eventStartTime, setEventStartTime] = useState<Date | null>(null);
  const [eventEndTime, setEventEndTime] = useState<Date | null>(null);


  const locale = usePathname().split('/')[1];
  const t = useTranslations('Calendar');

  const handleAddEvent = () => {
    if (!eventDate)
      return undefined;

      const newEvent = {
        title: eventTitle,
        allDay: true,
        start: eventDate,
        end: eventDate,
      };
      setEvents([...events, newEvent]);
      setEventTitle('');
      setEventDate(null);
      setEventStartTime(null);
      setEventEndTime(null);
  };

  const handleSelectEvent = (event: Event) => {
    console.log(event);
  };

  return <StyledPage>
    <NavigationBar />
    <Typography style={ { textAlign: 'center' } } variant="h4">{ t('title') }</Typography>

    <WrapperDiv>
      <div>
        <input
          type="date"
          onChange={ (e) => setEventDate(new Date(e.target.value)) }
      />
        <input
          type="time"
          onChange={ (e) => {
            const timeParts = e.target.value.split(':');
            if (eventDate && timeParts[0] && timeParts[1]) {
              const updatedStartDate = new Date(eventDate);
              updatedStartDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
              setEventStartTime(updatedStartDate);
            }
          } }
          />
        <input
          type="time"
          onChange={ (e) => {
            const timeParts = e.target.value.split(':');
            if (eventDate && timeParts[0] && timeParts[1]) {
              const updatedEndDate = new Date(eventDate);
              updatedEndDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
              setEventEndTime(updatedEndDate);
            }
          } }
        />
      </div>
      <div>
        <input
          placeholder={ t('addInputPlaceholder') }
          type="text"
          value={ eventTitle }
          onChange={ (e) => setEventTitle(e.target.value) }
        />
        <Button color="primary" variant="contained" onClick={ handleAddEvent }>
          { t('add') }
        </Button>
      </div>
    </WrapperDiv>

    <BigCalendar events={ events } locale={ locale } onSelectEvent={ handleSelectEvent }/>
  </StyledPage>;
}