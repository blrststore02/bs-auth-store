import { useGlobalStorage } from "@/context/storage.context";
import { usePathname, useRouter } from "next/navigation";
import { BehaviorSubject } from "rxjs";

export const useAuthGuard = () => {
  const path = "/login";

  const router = useRouter();
  const routerPath = usePathname();
  const globalData = useGlobalStorage();
  
  const user$ = new BehaviorSubject(JSON.parse((globalData.getByKey('user') as string)));
  
  const routeUserOnAuth = () => {
    if (!globalData.getByKey('user')) {
      if (!routerPath.includes(path)) {
        router.push(path);
      }
    } else {
      if (routerPath.includes(path)) {
        router.push('/dashboard');
      }
    }
  }

  const authenticateUser = (user: any) => {
    user$.next(user);
    globalData.setByKey('user', JSON.stringify(user));
  }

  const logoutUser = () => {
    globalData.clearAll();
    router.push(path);
  }

  const clearUserDetails = () => {
    globalData.clearAll();
  }

  const isUserAuthenticated = () => {
    return globalData.getByKey('user') || false;
  }

  return {
    routeUserOnAuth,
    authenticateUser,
    logoutUser,
    isUserAuthenticated,
    clearUserDetails,
    get userValue() { return user$.value && user$.value.uniqueIdentifier || "" },
  }
}
