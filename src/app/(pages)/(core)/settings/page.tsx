"use client";
import BsAddUserModal from "@/components/bsAddUserModal";
import { SettingsService } from "@/library/settings.service";
import { useAuthGuard } from "@/library/auth.service";
import { BsSettings } from "@/models/BsSettings";
import { useEffect, useState } from "react";

export default function Settings() {
    const settingsService = SettingsService();
    const authGuard = useAuthGuard();
    const [showSave, setShowSave] = useState<boolean>(false);
    const defaultSettings: BsSettings = {applicationKey: "", applicationName: "", logoId: 0, logoName: "" };
    const [formData, setFormData] = useState<BsSettings>(defaultSettings);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const submitForm: any = async (event?: any) => {
        event?.stopPropagation();
        const [data, isloading] = await settingsService.setAppliationSettings(formData);
        if (data && !data.error && !isloading) {
            setIsLoading(false);
            loadApplicationDetails();
            setShowSave(false);
            authGuard.routeUserOnAuth();
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = (event.target as HTMLInputElement).id;
        const value = (event.target as HTMLInputElement).value;
        setShowSave(true);
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const loadApplicationDetails = async () => {
        const [response, isLoading] = await settingsService.getAppliationSettings();
        if (response && !isLoading) setFormData(response);
    }

    useEffect(() => {
        loadApplicationDetails();
    }, [])

    return (
        <>
            <section className="flex flex-row w-full h-auto bg-[#F9FAFB] dark:bg-gray-900">
                <div className="bs-settings flex z-[1] w-3/5 py-8 px-4 mx-auto max-w-screen-xl max-md:py-1 sm:py-1 lg:px-6">
                    <div className="flex py-4 w-full">
                        <div className="bs-settings flex h-min shadow-[0_0_15px_-5px_rgba(0,0,0,0.3)] z-[1] w-full py-8 px-4 mx-auto max-md:py-1 sm:py-1 lg:px-6">
                            <div className=" py-2 pb-8 w-full">
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div className="flex py-2 w-full header mx-auto justify-between">
                                        <span className="flex text-lg font-semibold items-center group">Application Settings</span>
                                        <div className="relative z-0 items-center group">
                                            <button type="button" className={`${!showSave && 'hidden'} w-full text-[#0092f4] hover:bg-primary-700 border-none focus:ring-4 focus:outline-none hover:text-white focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0092f4] dark:hover:bg-primary-700 dark:focus:ring-primary-800`} onClick={submitForm}>Save</button>
                                        </div>
                                    </div>
                                    <div className="flex mx-auto w-4/5 flex-col">
                                        <div className="flex body px-4 py-4 flex-row w-full justify-between">
                                            <span className="flex text-md items-center justify-items-start">Application Name</span>
                                            <div className="relative z-0 items-center group justify-items-end w-3/6 max-sm:w-3/5">
                                                <input type="text" name="applicationName" id="applicationName" className="block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData?.applicationName || ''} onChange={handleInput} required />
                                                <label htmlFor="applicationName" className="peer-focus:font-medium absolute text-sm text-[#0092f4] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-1 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0092f4] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 max-sm:overflow-x-hidden">Enter your Application Name</label>
                                            </div>
                                        </div>
                                        <div className="flex px-4 py-4 flex-row w-full justify-between">
                                            <span className="flex text-md items-center justify-items-start">Keywords</span>
                                            <div className="relative z-0 items-center group w-3/6 justify-items-end max-sm:w-3/5">
                                                <input type="text" name="applicationKey" id="applicationKey" className="block px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={formData?.applicationKey || ''} onChange={handleInput} required />
                                                <label htmlFor="applicationKey" className="peer-focus:font-medium absolute text-sm text-[#0092f4] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0092f4] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 max-sm:overflow-x-hidden z-10">Enter your Application Keywords</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}