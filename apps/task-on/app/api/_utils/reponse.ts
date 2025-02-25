import { NextResponse } from 'next/server';

export type responseType<T> = {
  message?: string;
  success: boolean;
  status: number;
  data?: T;
}

export const createResponse = <T>({ message, success, status, data }: responseType<T>) => {
  return NextResponse.json({ message, success, status, data });
};