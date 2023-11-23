"use client";
import { Loading } from '@/components/bsLoading';
import { useAuthGuard } from '@/library/user.service';
import { Suspense, useLayoutEffect } from 'react';

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authGuard = useAuthGuard();
  useLayoutEffect(() => {
    authGuard.routeUserOnAuth();
  })
  return (
    <>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </>
  )
}
