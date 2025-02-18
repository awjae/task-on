import './global.css';
import { StyledComponentsRegistry } from './registry';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          as="style"
          // eslint-disable-next-line max-len
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
