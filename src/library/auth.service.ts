import { RestEndPService } from "@/api/restClient.service";
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
    if(user && user.uniqueIdentifier && user.responseData) {
      const userObj = {uniqueIdentifier : user.uniqueIdentifier, user: user.responseData} 
      globalData.setByKey('user', JSON.stringify(userObj));
    } else {
      logoutUser();
    }
  }

  const logoutUser = () => {
    globalData.clearAll();
    router.push(path);
  }

  const clearUserDetails = () => {
    globalData.clearAll();
  }

  const isUserAuthenticated = () => {
    const user = globalData.getByKey('user') && JSON.parse(globalData.getByKey('user') as string);
    return (user && user.uniqueIdentifier) || false;
  }

  return {
    routeUserOnAuth,
    authenticateUser,
    logoutUser,
    isUserAuthenticated,
    clearUserDetails,
    get token() { return user$.value && user$.value.uniqueIdentifier || "" },
    get getUser() { return user$.value && user$.value.user || {}}
  }
}
