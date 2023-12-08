import { RestEndPService } from "@/api/restClient.service";
import { useAuthGuard } from "./auth.service";
import { toast } from "@/components/bsToast";
import { BsNumber, BsNumbers } from "@/models/BsNumber";
import { BsRequest } from "@/models/BsRequest";

export const DashboardService = () => {
    const restEndPService = RestEndPService();
    const authGuard = useAuthGuard();

    const defaultResponse: BsRequest = {
        message: undefined,
        responseStatus: undefined,
        statusCode: undefined,
        responseData: undefined,
        uniqueIdentifier: undefined,
        totalCount: 0
    }

    const setNumberByDate = async (payload: any) => {
        let response: BsRequest = defaultResponse;
        let isLoading: boolean = true;
        try {
            if (!authGuard.isUserAuthenticated())
                authGuard.routeUserOnAuth();
            response = await restEndPService.post(`/generator/${authGuard.token}/create`, payload.number).then((response: { data: any; }) => response.data || defaultResponse);
        } catch (err: unknown) {
            toast.notify(`Unknown error encountered. Please try again after some time!!!`, { type: 'error', duration: 50 });
        } finally {
            isLoading = false;
        }
        return [response, isLoading];
    }

    const getNumberList = async (pageNum: Number = 0, pageSize: Number = 10): Promise<[BsNumbers, boolean]> => {
        let responseObj: BsRequest = defaultResponse;
        let response: BsNumbers = { results: [], totalcount: 0 };
        let isLoading: boolean = true;
        try {
            responseObj = await restEndPService.get(`/generator/${authGuard.token}/allNumbers`, { pageNum, pageSize }).then((response: { data: any; }) => response.data || defaultResponse);
            response = {
                results: responseObj!.responseData || [],
                totalcount: responseObj!.totalCount || 0
            }
        } catch (err: unknown) {
            toast.notify(`Unknown error encountered. Please try again after some time!!!`, { type: 'error', duration: 50 });
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
        try {
            response = await restEndPService.get(`/generator/${authGuard.token}/number/${date}`).then((response: { data: any; }) => response.data);
        } catch (err: unknown) {
            toast.notify(`Unknown error encountered. Please try again after some time!!!`, { type: 'error', duration: 50 });
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
