import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";
import { toast } from "@/components/bsToast";
import { useAuthGuard } from "./auth.service";

export const UserService = () => {
    const restEndPService = RestEndPService();
    const authGuard = useAuthGuard();
    const add = async (userInfo: any) => {
        let sessionStatus: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            const data: any = await restEndPService.post("/generator/user", { userInfo }).then((response: { data: any; }) => response.data);
            sessionStatus = data;
            // authGuard.authenticateUser(data);
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

    return {
        add,
    };
}
