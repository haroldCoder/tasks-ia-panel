import { HttpMethod } from "../../enums/httpmethods.enum"
import { usersRoutes } from "../routes/users.routes";
import { createRequest } from "./requestMethod"

export const verifyUser = async(term: string) =>{
    const response = await createRequest(HttpMethod.GET, `${usersRoutes.getUser}${term}`);
    return response;
}