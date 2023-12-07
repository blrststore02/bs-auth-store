import { UserService } from "@/library/user.service";
import { BsUser } from "@/models/BsUser";
import { useState } from "react";

export default function BsAddUserModal(props: { showModal: boolean, closeModal: Function }) {
    const userService = UserService();
    const defaultUser: BsUser = { email: "", name: "", password: "", securityAnswer: "", userName: "" };
    const [formData, setFormData] = useState<BsUser>(defaultUser);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ status: string, message: string } | null>(null);
    const closeModal = () => {
        props.closeModal(true);
    }

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const [data, isloading, err] = await userService.add(formData);
        if (data && data.responseStatus === "OK" && !isloading) {
            setIsLoading(false);
            setError(err);
            setFormData(defaultUser);
            closeModal();
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = (event.target as HTMLInputElement).id;
        const value = (event.target as HTMLInputElement).value;

        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <div id="crud-modal" tabIndex={-1} aria-hidden={props.showModal} className={`${props.showModal ? '' : 'hidden'} overflow-y-auto animate-[fadeInOut_1s_ease-in-out] overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-4xl max-h-full m-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Create New User
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => closeModal()}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={($event) => submitForm($event)} noValidate>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 w-1/2 pb-4">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" id="name" onChange={($event) => handleInput($event)} value={formData.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete="off" placeholder="Type Full Name" required={false} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                                    <input type="text" name="userName" id="userName" onChange={($event) => handleInput($event)} value={formData.userName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete="off" placeholder="Type User Name" required={false} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" onChange={($event) => handleInput($event)} value={formData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete="off" placeholder="Type Email" required={false} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" onChange={($event) => handleInput($event)} value={formData.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="*******" required={false} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="*******" required={false} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="securityQuestion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security Question</label>
                                    <input type="text" name="securityQuestion" id="securityQuestion" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete="off" placeholder="Type Security Question" required={false} />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="securityAnswer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security Answer</label>
                                    <input type="text" name="securityAnswer" id="securityAnswer" onChange={($event) => handleInput($event)} value={formData.securityAnswer} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" autoComplete="off" placeholder="Type Security Answer" required={false} />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Description</label>
                                    <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="off" placeholder="Write User description here"></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}