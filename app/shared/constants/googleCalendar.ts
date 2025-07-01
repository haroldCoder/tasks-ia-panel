
export interface IGoogleCalendar{
    loadingCreate: boolean,
    errorCreate: string | null,
    data: [],
    successCreate: boolean | null,
}

export const googleCalendarState : IGoogleCalendar = {
    loadingCreate: false,
    errorCreate: null,
    data: [],
    successCreate: null,
}