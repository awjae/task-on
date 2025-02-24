import { NextResponse } from 'next/server';

export const createResponse = (message: string, success: boolean, status: number) => {
  return NextResponse.json({ message, success }, { status });
};