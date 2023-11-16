import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";
import { useAuthGuard } from "./user.service";
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
        logout
    };
}
