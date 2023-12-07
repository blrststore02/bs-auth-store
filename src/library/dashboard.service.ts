import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";
import { useAuthGuard } from "./auth.service";
import { toast } from "@/components/bsToast";
import { BsNumber, BsNumbers } from "@/models/BsNumber";

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
            const data: any = await restEndPService.post(`/generator/${authGuard.token}/create`, num.number).then((response: { data: any; }) => response.data);
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

    const getNumberList = async (pageNum: Number = 0, pageSize: Number = 10): Promise<[BsNumbers, boolean]> => {
        let response: BsNumbers = { results: [], totalcount: 0 };
        let isLoading: boolean = true;
        let error: any = {
            message: ""
        };
        try {
            const data: any = await restEndPService.get("/reader/allNumbers", { pageNum, pageSize }).then((response: { data: any; }) => response.data);
            response = data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                error = { message: err.message };
            } else {
                error = { message: error || "Please wait a few minutes before you try again!!!" };
            }
            toast.notify(`Error: ${error.message}`);
        } finally {
            isLoading = false;
        }
        return [response, isLoading];
    }

    const getNumberByDate = async (date: any) => {
        let response: BsNumber = {
            id: 0,
            randomNumber: 0,
            numberInsertionDate: ""
        };
        let isLoading: boolean = true;
        let error: any = {
            message: ""
        };
        try {
            response = await restEndPService.get(`/reader/number/${date}`).then((response: { data: any; }) => response.data);
        } catch (err: unknown) {
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

    return {
        getNumberList,
        getNumberByDate,
        setNumberByDate
    };
}
