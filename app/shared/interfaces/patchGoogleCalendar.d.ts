import { StatusCalendar } from "../enums/statusCalendar.enum";
import { GoogleCalendar } from "./googleCalendar";

export interface PatchGoogleCalendar extends GoogleCalendar{
    status: StatusCalendar
}