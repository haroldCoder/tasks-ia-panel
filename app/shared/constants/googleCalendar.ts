import { calendar_v3 } from "googleapis";

export interface IGoogleCalendar{
    loadingCreate: boolean,
    errorCreate: string | null,
    data: [],
    successCreate: boolean | null,
    loadingGet: boolean,
    errorGet: string | null,
    dataGet: Array<calendar_v3.Schema$Event>,
    successGet: boolean | null,
    loadingSearch: boolean,
    errorSearch: string | null,
    dataSearch: [],
    successSearch: boolean | null,
    loadingDelete: boolean | null, 
    successDelete: {
        status: boolean,
        eventsid: Array<string>
    } | null,
    loadingGetEvt: boolean | null,
    dataGetEvt: calendar_v3.Schema$Event | null,
    loadingPatch: boolean | null,
    successPatch: boolean | null
}

export const googleCalendarState : IGoogleCalendar = {
    loadingCreate: false,
    errorCreate: null,
    data: [],
    successCreate: null,
    loadingGet: false,
    errorGet: null,
    dataGet: [],
    successGet: null,
    loadingSearch: false,
    errorSearch: null,
    dataSearch: [],
    successSearch: null,
    loadingDelete: null,
    successDelete: null,
    loadingGetEvt: null,
    dataGetEvt: null,
    loadingPatch: null,
    successPatch: null
}