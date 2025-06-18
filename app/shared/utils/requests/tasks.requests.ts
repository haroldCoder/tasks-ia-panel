import { HttpMethod } from "../../enums/httpmethods.enum"
import { tasksRoutes } from "../routes/tasks.routes";
import { createRequest } from "./requestMethod"

export const getTasksByUser = async(term: string) => {
    const response = await createRequest(HttpMethod.GET, `${tasksRoutes.getAllTasksByUser}${term}`);
    return response;
}

export const deleteTask = async(id: number) =>{
    const response = await createRequest(HttpMethod.DELETE, `${tasksRoutes.deleteTask}${id}`);
    return response;
}