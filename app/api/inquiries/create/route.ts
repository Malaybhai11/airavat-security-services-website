import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const inquiry = await prisma.inquiry.create({
    data: {
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    },
  });
  return NextResponse.json({ success: true, inquiryId: inquiry.id });
}
