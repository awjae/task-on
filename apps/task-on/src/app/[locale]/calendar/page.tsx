'use client';

import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer, DateRange } from 'react-big-calendar';
import { format as defaultFormat, getDay, parse, startOfWeek } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS, ko } from 'date-fns/locale';
import { StyledPage } from '../styles';
import { usePathname } from 'next/navigation';
import NavigationBar from '../../_components/navigation-bar';
import { useTranslations } from 'next-intl';

const locales = {
  'en-US': enUS,
  'ko-KR': ko,
};

// NOTE: 외부 라이브러리에 대한 국제화는 일괄적으로 i18n에서 관리할 수 가 없음
const localizer = dateFnsLocalizer({
  format: defaultFormat,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// NOTE: 외부 라이브러리에 대한 국제화는 일괄적으로 i18n에서 관리할 수 가 없음
const message = {
  allDay: '종일',
  previous: '이전',
  next: '다음',
  today: '오늘',
  month: '월',
  week: '주',
  day: '일',
  agenda: '일정',
  date: '날짜',
  time: '시간',
  event: '이벤트',
  noEventsInRange: '범위 내에 이벤트가 없습니다.',
  showMore: (total: number) => `+ 더보기 (${total})`,
};

/* eslint-disable max-len */
const format = {
  dateFormat: 'dd',
  dayFormat: (date: Date) => `${date.toLocaleDateString('ko-KR', { weekday: 'short' })} ${date.toLocaleDateString('ko-KR', { day: '2-digit', month: '2-digit' })}`, // 요일 및 날짜 형식 (예: "수 01/04")
  weekdayFormat: (date: Date) => date.toLocaleDateString('ko-KR', { weekday: 'short' }),
  timeGutterFormat: (date: Date) => date.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true }), // 시간 형식 (예: "4:00") // 시간 형식 (예: "4:00 오전")
  monthHeaderFormat: (date: Date) => date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' }), // 월 헤더 형식 (예: "2023년 4월")
  dayRangeHeaderFormat: ({ start, end }: DateRange) => `${start.toLocaleDateString('ko-KR')} - ${end.toLocaleDateString('ko-KR')}`,
  dayHeaderFormat: (date: Date) => `${date.toLocaleDateString('ko-KR', { weekday: 'long' })} ${date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: '2-digit' })}`, // 일 헤더 형식 (예: "수요일 2023년 04월 01일")
  agendaHeaderFormat: ({ start, end }: DateRange) => `${start.toLocaleDateString('ko-KR')} — ${end.toLocaleDateString('ko-KR')}`,
  selectRangeFormat: ({ start, end }: DateRange) => `${start.toLocaleTimeString('ko-KR')} — ${end.toLocaleTimeString('ko-KR')}`,
  agendaDateFormat: (date: Date) => date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
  agendaTimeFormat: (date: Date) => date.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true }),
  agendaTimeRangeFormat: ({ start, end }: DateRange) => `${start.toLocaleTimeString('ko-KR')} — ${end.toLocaleTimeString('ko-KR')}`,
  eventTimeRangeFormat: ({ start, end }: DateRange) => `${start.toLocaleTimeString('ko-KR')} — ${end.toLocaleTimeString('ko-KR')}`,
  eventTimeRangeStartFormat: ({ start, end }: DateRange) => start.toLocaleTimeString('ko-KR'),
  eventTimeRangeEndFormat: ({ start, end }: DateRange) => end.toLocaleTimeString('ko-KR'),
};
/* eslint-disable max-len */

export default function Index() {
  const [events, setEvents] = useState<{ title: string; start: Date; end: Date }[]>([]);
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

    <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between',  marginTop: 16 } }>
      <input
        style={ { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' } }
        type="date"
        onChange={ (e) => setEventDate(new Date(e.target.value)) }
      />
      <input
        placeholder={ t('addInputPlaceholder') }
        style={ { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', flexGrow: 1, margin: '0px 8px' } }
        type="text"
        value={ eventTitle }
        onChange={ (e) => setEventTitle(e.target.value) }
      />
      <Button color="primary" variant="contained" onClick={ handleAddEvent }>
        { t('add') }
      </Button>
    </div>

    { /* TODO: toolbar 커스텀 필요함 */ }
    <div style={ { width: '100%', overflowX: 'auto', marginTop: 16 } }>
      <Calendar
        endAccessor="end"
        events={ events }
        formats={ locale === 'ko' ? format : undefined }
        localizer={ localizer }
        messages={ locale === 'ko' ? message : undefined }
        startAccessor="start"
        style={ { height: 500, margin: '20px 0' } }
      />
    </div>
  </StyledPage>;
}