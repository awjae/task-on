'use client';

import { useState } from 'react';
import { Button, styled, Typography } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StyledPage } from '../styles';
import { usePathname } from 'next/navigation';
import NavigationBar from '../../_components/navigation-bar';
import { useTranslations } from 'next-intl';
import BigCalendar from './_components/big-calendar';

export interface IEvent {
  title: string;
  start: Date;
  end: Date
}

const WrapperDiv = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16;
  gap: 8px;

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    flex-grow: 1;
  }
`;

export default function Index() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const locale = usePathname().split('/')[1];
  const t = useTranslations('Calendar');

  const handleAddEvent = () => {
    if (eventTitle && eventDate) {
      const newEvent = {
        title: eventTitle,
        start: eventDate,
        end: eventDate,
      };
      setEvents([...events, newEvent]);
      setEventTitle('');
      setEventDate(null);
    }
  };

  return <StyledPage>
    <NavigationBar />
    <Typography style={ { textAlign: 'center' } } variant="h4">{ t('title') }</Typography>

    <WrapperDiv>
      <input
        type="date"
        onChange={ (e) => setEventDate(new Date(e.target.value)) }
      />
      <input
        placeholder={ t('addInputPlaceholder') }
        type="text"
        value={ eventTitle }
        onChange={ (e) => setEventTitle(e.target.value) }
      />
      <Button color="primary" variant="contained" onClick={ handleAddEvent }>
        { t('add') }
      </Button>
    </WrapperDiv>

    <BigCalendar events={ events } locale={ locale }/>
  </StyledPage>;
}