import { useAuthGuard } from "@/library/auth.service";
import { BsSettings } from "@/models/BsSettings";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BsAddUserModal from "./bsAddUserModal";

export default function BsHeader(props: { appName: BsSettings, logout: Function }) {
    const pathname = usePathname();
    const globalData = useAuthGuard();
    const [hiddenDropdownInformation, setHiddenDropdownInformation] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const signOut = async ($event: any) => {
        await props.logout($event);
    }

    const closeUserModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        setUser(globalData.getUser || {});
        document.body.addEventListener('click', () => setHiddenDropdownInformation(false), true);;
    }, [])

    return (
        <>
            <BsAddUserModal showModal={showModal} closeModal={closeUserModal} />
            <header className="overflow-hidden bg-gradient-to-r from-[#00C5EF] to-[#0092f4]">
                <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="https://flowbite.com" className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt={`${props.appName?.applicationName || 'Application'} Logo`} />
                            <span className="self-center text-xl font-semibold capitalize whitespace-nowrap dark:text-white">{props.appName?.applicationName || 'Application Name'}</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <img src="/logout.svg" width={16} height={16} alt="Logout"></img>
                            </button>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <a href={`/dashboard`} className={`${pathname === '/dashboard' ? 'block py-2 pr-4 pl-3 text-white rounded bg-white-700 lg:bg-transparent lg:text-white-700 lg:p-0 dark:text-white' : 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'}`} aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                                </li>
                                <li>
                                    <a href={`/settings`} className={`${pathname === '/settings' ? 'block py-2 pr-4 pl-3 text-white rounded bg-white-700 lg:bg-transparent lg:text-white-700 lg:p-0 dark:text-white' : 'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'}`}>Settings</a>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:w-auto lg:order-1" id="mobile-menu-3">
                            <a href="#" className="text-gray-800 hidden dark:text-white lg:flex lg:w-auto hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">About</a>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:inline-flex lg:w-auto lg:order-2" id="mobile-menu-3">
                            <div className="relative">
                                <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white focus:ring-4 2xl:-translate-x-2/3 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center" type="button" onClick={() => setHiddenDropdownInformation(!hiddenDropdownInformation)}>
                                    <div className="w-8 h-8 rounded-full border-2 border-solid border-white flex bg-gray-500"><span className="text-center flex justify-between m-auto text-xl text-[#00C5EF]">{user && user?.name && user?.name[0]}</span></div>
                                </button>
                                <div id="dropdownInformation" className={`${!hiddenDropdownInformation && 'hidden'} fixed -translate-x-[5%] xl:-translate-x-[0%] 2xl:-translate-x-2/3 z-50 bg-white lg:right-8 divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700 dark:divide-gray-600`}>
                                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                        <div>{user && user?.name}</div>
                                        <div title={user && user?.email} className="font-medium truncate">{user && user?.email}</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                        <li>
                                            <button className="block px-4 py-2 w-full text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowModal(true)}>Add User</button>
                                        </li>
                                    </ul>
                                    <div className="py-2 w-full">
                                        <button className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={signOut}>Sign out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}