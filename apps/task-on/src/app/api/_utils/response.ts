import { NextResponse } from 'next/server';

export interface IResponseType<T> {
  message?: string;
  success: boolean;
  status: number;
  data?: T;
}

export const createResponse = <T>({ message, success, status, data }: IResponseType<T>) => {
  return NextResponse.json({ message, success, status, data });
};