'use client';

import { Calendar, Event } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarWrapper } from './styles';
import { format, localizer, message } from './util';


//NOTE: localstorage에 date값이 string으로 저장되는 case 발생
function parseStringToDate(events: Event[]) {
  return events.map(event => ({
    ...event,
    start: event.start ? new Date(event.start) : new Date(),
    end: event.end ? new Date(event.end) : new Date()
  }));
}

export default function BigCalendar({
  events,
  locale,
  onSelectEventAction
}: {
  events: Event[];
  locale?: string;
  onSelectEventAction: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
}) {

  return <CalendarWrapper>
    <Calendar
      endAccessor="end"
      events={ parseStringToDate(events) }
      formats={ locale === 'ko' ? format : undefined }
      localizer={ localizer }
      messages={ locale === 'ko' ? message : undefined }
      startAccessor="start"
      style={ { height: 500, margin: '20px 0' } }
      onSelectEvent={ onSelectEventAction }
    />
  </CalendarWrapper>;
}