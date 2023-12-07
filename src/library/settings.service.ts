import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";
import { toast } from "@/components/bsToast";
import { useAuthGuard } from "./auth.service";
import { BsSettings } from "@/models/BsSettings";

export const SettingsService = () => {
    const path = "/generator";
    const restEndPService = RestEndPService();
    const authGuard = useAuthGuard();
    const getAppliationSettings = async () => {
        let response: any = {};
        let isLoading: boolean = true;
        let error: any = {
            message: ""
        };
        try {
            if (!authGuard.isUserAuthenticated())
                authGuard.routeUserOnAuth();
            response = await restEndPService.get(`${path}/logo/${authGuard!.token || null}/${1}`).then((response: { data: any; }) => response.data);
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

    const setAppliationSettings = async (settings: BsSettings) => {
        let response: any = {};
        let isLoading: boolean = true;
        let error: any = {
            message: ""
        };
        try {
            if (!authGuard.isUserAuthenticated())
                authGuard.routeUserOnAuth();
            response = await restEndPService.post(`${path}/logo/${authGuard.token}`, settings).then((response: { data: any; }) => response.data);
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

    return {
        getAppliationSettings,
        setAppliationSettings
    };
}
