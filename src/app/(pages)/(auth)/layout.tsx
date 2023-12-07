"use client";
import { useAuthGuard } from '@/library/auth.service';
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
