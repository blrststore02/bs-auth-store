import { HttpStatusCode } from "axios";

export class BsRequest {
    message: string | undefined = "";
    responseStatus: string | undefined = "";
    statusCode: HttpStatusCode | undefined = HttpStatusCode.ExpectationFailed;
    responseData: any;
    uniqueIdentifier: string | undefined;
    totalCount: number = 0;
}