import { ThemeProvider } from '@mui/material';
import './global.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { customTheme } from '../_common/theme';
import { Toaster } from 'react-hot-toast';
import Container from './container';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'TaskOn - 초간단 할 일 | Super Simple Todo List',
  description: 'TaskOn - 초간단 할 일 | Super Simple Todo List',
  keywords: [
    'todo list', 'task management', 'productivity', 'organization',
    '할일관리', '투두리스트', '일정관리', '태스크관리', '생산성', '시간관리',
    '할 일', '할일', '일정', '업무관리', '플래너'
  ],
  authors: [{ name: 'TaskOn Team' }],
  openGraph: {
    title: 'TaskOn - 초간단 할 일 | Super Simple Todo List',
    description: '효율적인 할 일 관리를 위한 TaskOn',
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    siteName: 'TaskOn',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskOn - 초간단 할 일',
    description: '초간단 할 일 관리를 위한 TaskOn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale))
    notFound();


  return (
    <html lang={ locale }>
      <head>
        <link
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
          rel="stylesheet"
          />
      </head>
      <body>
        <AppRouterCacheProvider options={ { key: 'css' } }>
          <ThemeProvider theme={ customTheme }>
            <NextIntlClientProvider>
              <Container>
                { children }
              </Container>
            </NextIntlClientProvider>
          </ThemeProvider>
          <Toaster />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
