'use client';
import { createTheme } from '@mui/material';

// MUI의 Palette 인터페이스 확장
declare module '@mui/material' {
  interface Palette {
    taskOn: {
      mintGreen: string;
      oliveGreen: string;
      lightGreen: string;
      lightYellow: string;
      lightRed: string;
    };
  }

  interface PaletteOptions {
    taskOn: {
      mintGreen: string;
      oliveGreen: string;
      lightGreen: string;
      lightYellow: string;
      lightRed: string;
    };
  }
}

// 테마 생성
export const customTheme = createTheme({
  cssVariables: true,
  palette: {
    taskOn: {
      mintGreen: '#74d3ae',
      oliveGreen: '#678d58',
      lightGreen: '#a6c48a',
      lightYellow: '#f6e7cb',
      lightRed: '#dd9787',
    },
  },
});
