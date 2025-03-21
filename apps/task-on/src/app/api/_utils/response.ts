import { NextResponse } from 'next/server';

export interface IResponseType<T> {
  message?: string;
  status: number;
  data?: T;
}

export const createResponse = <T>({ message, status, data }: IResponseType<T>) => {
  return NextResponse.json({ message, status, data }, {status: status});
};