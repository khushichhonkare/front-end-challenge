// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { User, Role } from '@/types';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Mock authentication logic
  if (email === 'manager@slooze.com' && password === 'password') {
    const user: User = {
      id: '1',
      email: 'manager@slooze.com',
      role: 'Manager',
      token: 'fake-manager-jwt',
    };
    return NextResponse.json(user);
  } else if (email === 'storekeeper@slooze.com' && password === 'password') {
    const user: User = {
      id: '2',
      email: 'storekeeper@slooze.com',
      role: 'Store Keeper',
      token: 'fake-storekeeper-jwt',
    };
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
