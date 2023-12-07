import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";
import { useAuthGuard } from "./auth.service";
import { toast } from "@/components/bsToast";

export const LoginService = () => {
    const restEndPService = RestEndPService();
    const authGuard = useAuthGuard();
    const login = async (login: any) => {
        let sessionStatus: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            const data: any = await restEndPService.post("/generator/login", {} ,{auth: login}).then((response: { data: any; }) => response.data);
            sessionStatus = data;
            authGuard.authenticateUser(data);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.log(`Error: ${err}`);
                error = { status: err.message || "Invalid user name or password" };
            } else {
                error = { status: "failure", message: error || "Server Error!!!" };
            }
            toast.notify(`Error: ${error.status}`);
        } finally {
            isLoading = false;
        }
        return [sessionStatus, isLoading, error];
    }

    const getAppSettings = async () => {
        let response: any = {};
        let isLoading: boolean = true;
        let error: any = {
            message: ""
        };
        try {
            response = await restEndPService.get(`/reader/logo/${1}`).then((response: { data: any; }) => response.data);
        } catch (err: AxiosError | unknown) {
            if (err instanceof AxiosError) {
                error = { message: err.message };
            } else {
                error = { message: error || "Please wait a few minutes before you try again!!!" };
            }
            toast.notify(`Error: ${error.message}`, { type: 'error', duration: 50 });
        } finally {
            isLoading = false;
        }
        return [response, isLoading];
    }

    const logout = async () => {
        let sessionStatus: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            const data: any = await restEndPService.get("/generator/logout").then((response: { data: any; }) => response.data);
            sessionStatus = data;
            authGuard.logoutUser();
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.log(`Error: ${err}`);
                error = { status: err.message || "Session not found. please clear browser cache from setting." };
            } else {
                error = { status: "failure", message: error || "Server Error!!!" };
            }
            toast.notify(`Error: ${error.status}`);
        } finally {
            isLoading = false;
        }
        return [isLoading, error];
    }

    return {
        login,
        logout,
        getAppSettings
    };
}
