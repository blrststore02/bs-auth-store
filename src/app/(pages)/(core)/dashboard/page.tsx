"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import BsForm from "@/components/bsForm";
import BsStatus from "@/components/bsStatus";
import { toast } from "@/components/bsToast";
import { BsTable } from "@/components/bsTable";
import { BsNumber, BsNumbers } from "@/models/BsNumber";
import { BSDatePicker } from "@/components/datePicker";
import { useAuthGuard } from "@/library/auth.service";
import { DashboardService } from "@/library/dashboard.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Carousel, CarouselInterface, CarouselItem, CarouselOptions } from "flowbite";

export default function Dashboard() {
    const router = useRouter();
    const queryparameters = useSearchParams();
    const authGuard = useAuthGuard();
    const dashboardService = DashboardService();

    const [num, setNum] = useState<number | null>();
    const [nums, setNums] = useState<BsNumber[]>([]);
    const [count, setCount] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(0);
    const pathName = usePathname();
    const [date, setDate] = useState("");
    const [todayDate, setTodayDate] = useState("");
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
        const [response, isLoading] = await dashboardService.setNumberByDate(form);
        if (response) {
            getNumberByDate(date);
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

    useEffect(() => {
        onPageLoad();
        setTodayDate(moment(new Date()).format('YYYY-MM-DD'));
        const selectedDate = queryparameters.get('date') || moment().format('YYYY-MM-DD');
        setDate(selectedDate);
        getNumberByDate(selectedDate);
    }, [])

    return (
        <>
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
                    <section className="flex flex-row w-11/12 h-full bg-white">
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
        </>
    )
}