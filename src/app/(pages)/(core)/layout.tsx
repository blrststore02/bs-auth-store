"use client";
import BsHeader from '@/components/bsHeader';
import { Loading } from '@/components/bsLoading';
import { LoginService } from '@/library/login.service';
import { SettingsService } from '@/library/settings.service';
import { useAuthGuard } from '@/library/auth.service';
import { Suspense, useLayoutEffect, useState } from 'react';

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authGuard = useAuthGuard();
  const [appName, setAppName] = useState<any>();
  const loginService = LoginService();
  const settingsService = SettingsService();

  const logoutUser = async () => {
    // event?.stopPropagation();
    const [isLoading, error] = await loginService.logout();
  }

  const loadApplicationDetails = async () => {
    const [response, isLoading] = await settingsService.getAppliationSettings();
    if (response && !isLoading) setAppName(response);
  }

  useLayoutEffect(() => {
    loadApplicationDetails();
    authGuard.routeUserOnAuth();
  }, [])
  return (
    <>
      <Suspense fallback={<Loading />}>
        <BsHeader appName={appName} logout={logoutUser} />
        <main className="flex min-h-main w-full">
          {children}
        </main>
      </Suspense>
    </>
  )
}
