import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";
import { useAuthGuard } from "./user.service";

export const DashboardService = () => {
    const restEndPService = RestEndPService();
    const authGuard = useAuthGuard();

    const setNumberByDate = async (num: any) => {
        let response: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            if (!authGuard.isUserAuthenticated())
                authGuard.routeUserOnAuth();
            const data: any = await restEndPService.post(`/generator/${authGuard.userValue}/create`, num.number).then((response: { data: any; }) => response.data);
            response = data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.log(`Error: ${err}`);
                error = { status: err.message || "Invalid user name or password" };
            } else {
                error = { status: "failure", message: error || "Server Error!!!" };
            }
        } finally {
            isLoading = false;
        }
        return [response, isLoading, error];
    }
    
    const getNumberList = async (date: string | null) => {
        let response: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            const data: any = await restEndPService.get("/reader/allNumbers", date).then((response: { data: any; }) => response.data);
            response = data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.log(`Error: ${err}`);
                error = { status: err.message || "Invalid user name or password" };
            } else {
                error = { status: "failure", message: error || "Server Error!!!" };
            }
        } finally {
            isLoading = false;
        }
        return [response, isLoading, error];
    }

    const getNumberByDate = async (date: any) => {
        let response: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            const data: any = await restEndPService.get(`/reader/number/${date}`).then((response: { data: any; }) => response.data);
            response = data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.log(`Error: ${err}`);
                error = { status: err.message || "Invalid user name or password" };
            } else {
                error = { status: "failure", message: error || "Server Error!!!" };
            }
        } finally {
            isLoading = false;
        }
        return [response, isLoading, error];
    }

    return {
        getNumberList,
        getNumberByDate,
        setNumberByDate
    };
}
