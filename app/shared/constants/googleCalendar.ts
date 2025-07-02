
export interface IGoogleCalendar{
    loadingCreate: boolean,
    errorCreate: string | null,
    data: [],
    successCreate: boolean | null,
    loadingGet: boolean,
    errorGet: string | null,
    dataGet: [],
    successGet: boolean | null,
    loadingSearch: boolean,
    errorSearch: string | null,
    dataSearch: [],
    successSearch: boolean | null,
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
}