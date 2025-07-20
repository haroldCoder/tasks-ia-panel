import { HttpMethod } from "../../enums/httpmethods.enum"
import { updateUserData } from "../../interfaces/updateUserData";
import { usersRoutes } from "../routes/users.routes";
import { createRequest } from "./requestMethod"

export const verifyUser = async(term: string) =>{
    const response = await createRequest(HttpMethod.GET, `${usersRoutes.getUser}${term}`);
    return response;
}

export const patchUser = async(term: string, userData: updateUserData) : Promise<Response> =>{
    const response = await createRequest(HttpMethod.PATCH, `${usersRoutes.updateUser}${term}`, userData);
    return response;
}