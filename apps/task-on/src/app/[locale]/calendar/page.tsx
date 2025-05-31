'use client';

import { useCallback, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { StyledPage } from '../styles';
import { usePathname } from 'next/navigation';
import NavigationBar from '../../_components/navigation-bar';
import { useTranslations } from 'next-intl';
import BigCalendar from './_components/big-calendar';
import { Event } from 'react-big-calendar';
import useLocalStorageState from 'use-local-storage-state';
import { WrapperDiv } from './styles';

export default function Index() {
  const isClient = typeof window !== 'undefined';
  const [events, setEvents] = useLocalStorageState<Array<Event>>('events', {
    defaultValue: isClient && localStorage.getItem('events') ?
      JSON.parse(localStorage.getItem('events') || '[]') : [],
    defaultServerValue: [],
  });

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [eventStartTime, setEventStartTime] = useState<Date | null>(null);
  const [eventEndTime, setEventEndTime] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const locale = usePathname().split('/')[1];
  const t = useTranslations('Calendar');

  const handleAddEvent = () => {
    if (!eventDate)
      return undefined;

      const newEvent = {
        title: eventTitle,
        allDay: true,
        start: eventStartTime || eventDate,
        end: eventEndTime || eventDate,
      };

      setEvents([...events, newEvent]);
      setEventTitle('');
      setEventDate(null);
      setEventStartTime(null);
      setEventEndTime(null);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleStartTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const timeParts = e.target.value.split(':');
    if (eventDate && timeParts[0] && timeParts[1]) {
      const updatedStartDate = new Date(eventDate);
      updatedStartDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
      setEventStartTime(updatedStartDate);
    }
  }, [eventDate]);

  const handleEndTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const timeParts = e.target.value.split(':');
    if (eventDate && timeParts[0] && timeParts[1]) {
      const updatedEndDate = new Date(eventDate);
      updatedEndDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
      setEventEndTime(updatedEndDate);
    }
  }, [eventDate]);

  const formatDate = (date: Date | null): string => {
    if (!date)
      return '';

    return date.toISOString().split('T')[0] ?? '';
  };

  const formatTime = (date: Date | null): string => {
    if (!date)
      return '';

    return date.toISOString().split('T')[1]?.substring(0, 5) ?? '';
  };

  return <StyledPage>
    <NavigationBar />
    <Typography style={ { textAlign: 'center' } } variant="h4">{ t('title') }</Typography>

    <WrapperDiv>
      <div>
        <input
          type="date"
          value={ formatDate(eventDate) }
          onChange={ (e) => setEventDate(new Date(e.target.value)) }
        />
        <input
          type="time"
          value={ formatTime(eventStartTime) }
          onChange={ handleStartTimeChange }
          />
        <input
          type="time"
          value={ formatTime(eventEndTime) }
          onChange={ handleEndTimeChange }
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

    <BigCalendar events={ events } locale={ locale } onSelectEventAction={ handleSelectEvent }/>

    <Dialog open={ openDialog } onClose={ handleCloseDialog }>
      <DialogTitle>{ selectedEvent?.title }</DialogTitle>
      <DialogContent>
        { selectedEvent?.allDay === false ?
          <>
            <Typography>시작 시간: { selectedEvent?.start?.toLocaleString() }</Typography>
            <Typography>종료 시간: { selectedEvent?.end?.toLocaleString() }</Typography>
          </>
          :
          <Typography>하루 종일</Typography>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleCloseDialog }>닫기</Button>
      </DialogActions>
    </Dialog>
  </StyledPage>;
}