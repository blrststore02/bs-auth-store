"use client";
import { useAuthGuard } from '@/library/user.service';
import { useLayoutEffect } from 'react';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authGuard = useAuthGuard();
  useLayoutEffect(() => {
    authGuard.routeUserOnAuth();
  })
  return (
    <>{children}</>
  )
}
