"use client";
import BsForm from "@/components/bsForm";
import BsStatus from "@/components/bsStatus";
import { toast } from "@/components/bsToast";
import { BSDatePicker } from "@/components/datePicker";
import { DashboardService } from "@/library/dashboard.service";
import { useAuthGuard } from "@/library/user.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginService } from "@/library/login.service";
import moment from "moment";
import { Carousel, CarouselInterface, CarouselItem, CarouselOptions } from "flowbite";
import { BsNumber, BsNumbers } from "@/models/BsNumber";
import { BsTable } from "@/components/bsTable";

export default function Dashboard() {
    const [num, setNum] = useState<number | null>();
    const [count, setCount] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(0);
    const pathName = usePathname();
    const [date, setDate] = useState("");
    const [todayDate, setTodayDate] = useState("");
    const authGuard = useAuthGuard();
    const router = useRouter();
    const queryparameters = useSearchParams()
    const dashboardService = DashboardService();
    const loginService = LoginService();
    const [nums, setNums] = useState<BsNumber[]>([]);
    const [dimensions, setDimensions] = useState<any>(
        {
            width: window!.innerWidth,
            height: window!.innerHeight,
        }
    );

    const handleResize = () => {
        setDimensions({
            width: window!.innerWidth,
            height: window!.innerHeight,
        });
    }

    const onPageLoad = () => {
        window.addEventListener("resize", handleResize, false);
        const items: CarouselItem[] = [
            {
                position: 0,
                el: document!.querySelector('#carousel-item-1')!,
            },
            {
                position: 1,
                el: document!.querySelector('#carousel-item-2')!,
            }
        ];
        const options: CarouselOptions = {
            defaultPosition: queryparameters && queryparameters.get("view") === "table" && 1 || 0,
            interval: 3000,
            indicators: {
                activeClasses: 'bg-[#0092f4]',
                inactiveClasses:
                    'bg-[#c2e6ff] hover:bg-[#4db7ff] dark:bg-gray-800/50 dark:hover:bg-gray-800',
                items: [
                    {
                        position: 0,
                        el: document!.getElementById('carousel-indicator-1')!,
                    },
                    {
                        position: 1,
                        el: document!.getElementById('carousel-indicator-2')!,
                    }
                ],
            },
            onChange: ($event) => {
                const position = $event!._activeItem!.position > 0 ? "table" : "calender";
                if ($event!._activeItem!.position > 0) {
                    setPageNum(0);
                    loadAllNumbers();
                }
                router.push(`${pathName}?view=${position}`);
            },
        };
        const carousel: CarouselInterface | null = (dimensions!.width >= 1024) && (new Carousel(items, options)) || null;
    }

    const loadAllNumbers = async (num: number = 0) => {
        const [response, isLoading]: [BsNumbers, boolean] = await dashboardService.getNumberList(num, pageSize);
        if ((response as BsNumbers && response.totalcount > -1) && !isLoading) {
            setNums(response.results);
            setCount(response.totalcount);
        }
    }

    const dateSelected = (selectedDate: any) => {
        setDate(selectedDate);
        getNumberByDate(selectedDate);
    }

    const nextBtnClicked = (event: any) => {
        event.stopPropagation();
        if (((pageNum + 1) * pageSize) < count) {
            loadAllNumbers(pageNum + 1);
            setPageNum(pageNum + 1);
        } else {
            toast.notify('you are already on last page', { type: 'warn', duration: 1 });
        }
    }

    const prevBtnClicked = (event: any) => {
        event.stopPropagation();
        if (pageNum > 0) {
            loadAllNumbers(pageNum - 1);
            setPageNum(pageNum - 1);
        } else {
            toast.notify('you are already on first page', { type: 'warn', duration: 1 });
        }
    }

    const formSubmitted = async (form: any) => {
        const [response, isLoading, error] = await dashboardService.setNumberByDate(form);
        if (response && response.responseStatus && !response.error) {
            router.push('/');
        } else {
            toast.notify(`error: ${response.error || error.message}`);
        }

    }

    const getNumberByDate = async (selectedDate: string) => {
        setNum(null);
        const [response, isLoading] = await dashboardService.getNumberByDate(selectedDate);
        if (response && !isLoading) setNum((response as BsNumber).randomNumber);
    }

    const selectedNum = (numRecord: BsNumber) => {
        setNum(numRecord.randomNumber);
        setDate(numRecord.numberInsertionDate);
    }

    const logoutUser = async (event: any) => {
        event?.preventDefault();
        const [isLoading, error] = await loginService.logout();
        error && toast.notify(error && error.message);
    }

    useEffect(() => {
        onPageLoad();
        setTodayDate(moment(new Date()).format('YYYY-MM-DD'));
        const selectedDate = queryparameters.get('date') || moment().format('YYYY-MM-DD');
        setDate(selectedDate);
        getNumberByDate(selectedDate);
    }, [])

    return (
        <>
            <header className="bg-gradient-to-r from-[#00C5EF] to-[#0092f4]">
                <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="https://flowbite.com" className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
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
                                    <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-white-700 lg:bg-transparent lg:text-white-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                                </li>
                                <li>
                                    <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-white-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:w-auto lg:order-1" id="mobile-menu-3">
                            <a href="#" className="text-gray-800 hidden dark:text-white lg:flex lg:w-auto hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">About</a>
                        </div>
                        <div title="logout" className="hidden justify-between items-center w-full lg:inline-flex lg:w-auto lg:order-2" id="mobile-menu-3">
                            <a href="#" className="text-gray-800 hidden dark:text-white lg:flex lg:w-auto hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={logoutUser}>
                                <img src="/logout.svg" width={16} height={16} alt="Logout"></img>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="flex min-h-main w-full">
                <section className="flex flex-row w-full bg-white dark:bg-gray-900">
                    <section className="flex flex-row w-full bg-white">
                        {
                            authGuard.isUserAuthenticated() && (date == todayDate && !num) ?
                                <BsForm date={date} submit={formSubmitted} />
                                :
                                <BsStatus date={date} num={num} dimensions={dimensions} dateSelected={dateSelected} />
                        }
                    </section>
                    {
                        (dimensions!.width >= 1024) &&
                        <section className="flex flex-row w-11/12 h-full bg-white m-4">
                            <div className="flex relative overflow-hidden h-full w-full">
                                <div id="carousel-item-1" className="duration-200 ease-linear h-full w-full">
                                    <BSDatePicker dateSelected={dateSelected} />
                                </div>
                                <div id="carousel-item-2" className="hidden duration-200 ease-linear w-full h-full">
                                    <BsTable list={nums} count={count} pageNum={pageNum} selectedNum={selectedNum} prev={prevBtnClicked} next={nextBtnClicked} />
                                </div>
                            </div>
                            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-7 left-3/4 md:bottom-7">
                                <button id="carousel-indicator-1" type="button" className="bg-[#0092f4] w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"></button>
                                <button id="carousel-indicator-2" type="button" className="bg-[#0092f4] w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 2"></button>
                            </div>
                        </section>
                    }
                </section>
            </main>
        </>
    )
}