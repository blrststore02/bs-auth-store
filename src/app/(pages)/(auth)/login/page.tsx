"use client";

import { ToastContainer } from "@/components/bsToast";
import { LoginService } from "@/library/login.service";
import { useAuthGuard } from "@/library/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Login() {
  const loginService = LoginService();
  const authGuard = useAuthGuard();
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ status: string, message: string } | null>(null);
  const [appName, setAppName] = useState<any>();

  const loadApplicationDetails = async () => {
    const [response, isLoading] = await loginService.getAppSettings();
    if (response && !isLoading) setAppName(response);
  }

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const [data, isloading, err] = await loginService.login(formData);
    if (data && data.uniqueIdentifier && !data.error && !isloading) {
      setIsLoading(false);
      setError(err);
      setFormData({ username: "", password: "" });
      authGuard.routeUserOnAuth();
    }
  }
  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = (event.target as HTMLInputElement).id;
    const value = (event.target as HTMLInputElement).value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
  useEffect(() => {
    loadApplicationDetails();
    authGuard.routeUserOnAuth();
  }, []);
  return (
    <main className="flex min-h-screen h-full flex-col items-center justify-between py-6 lg:p-20 sm:w-full">
      <ToastContainer />
      <section className="w-10/12">
        <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto sm:w-full">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt={`${appName?.applicationName || 'application'} logo`} />
            {appName?.applicationName || 'Application Name'}
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={submitForm}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                  <input type="text" name="username" id="username" onChange={($event) => handleInput($event)} value={formData.username} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" onChange={($event) => handleInput($event)} value={formData.password} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="on" required={true} />
                </div>
                <div className="flex items-center w-full justify-end">
                  <div className="flex justify-end">
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
