import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BsForm({ date, submit }: { date: string, submit: Function }) {
    const router = useRouter();
    const [formData, setFormData] = useState({ number: 0 });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const inputTextHanlder = (inputField: any) => {
        setFormData({ number: parseInt(inputField.target.value) });
        console.log(inputField.target.value);
    }

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        await submit(formData);
        setIsLoading(false);
        setFormData({ number: 0 });
        router.push(`/dashboard`);
    }

    return (
        <>
            <div className="bs-form flex items-center w-full py-8 px-4 mx-auto max-w-screen-xl max-md:py-1 sm:py-1 lg:px-6">
                <div className="mx-auto max-w-screen-sm flex align-middle h-4/5 w-4/5 flex-grow mt-1 text-center rounded-md max-sm:min-h-main max-sm:m-4">
                    <div className="text-white shadow-[0_0_15px_-5px_rgba(0,0,0,0.3)] z-[1] flex flex-col justify-around items-center w-full max-sm:max-h-screen-sm mx-auto bg-gradient-to-r from-[#00C5EF] to-[#0092f4] text-center h-full overflow-y-auto sm:h-full">
                        <div className="flex flex-col w-full">
                            <span className="counter-value text-4xl font-semibold max-sm:text-xl">Notifications</span>
                        </div>
                        <div className="flex flex-col w-full">
                            <span className="counter-value text-6xl py-2 max-sm:text-2xl">{date && moment(date).format('DD-MM-YYYY') || 'No Date Selected'}</span>
                            <span className="counter-value text-xl py-1 w-4/5 mx-auto max-sm:text-sm">Send daily Notification about date selected and spread it across!!!</span>
                        </div>
                        <div className="flex flex-col w-full">
                            <form className="space-y-4 md:space-y-6" action="#" onSubmit={submitForm}>
                                <div className="relative z-0 items-center mx-auto mb-6 group w-3/5 max-sm:w-4/5">
                                    <input type="text" name="floating_number" id="floating_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={inputTextHanlder} placeholder=" " required />
                                    <label htmlFor="floating_number" className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 max-sm:overflow-x-hidden">Enter your today's choice</label>
                                </div>
                                <div className="relative z-0 items-center mx-auto mb-6 group w-2/5">
                                    <button type="submit" className=" w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}