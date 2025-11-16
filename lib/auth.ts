'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function login(email: string, password: string) {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return { error: 'Invalid email or password' };
  }

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return { error: 'Invalid email or password' };
  }

  // Create session
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const admin = await prisma.admin.findUnique({
    where: { id: sessionId },
    select: { id: true, email: true },
  });

  return admin;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}

export async function createAdmin(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return { success: true, admin: { id: admin.id, email: admin.email } };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'Admin with this email already exists' };
    }
    return { error: 'Failed to create admin' };
  }
}

