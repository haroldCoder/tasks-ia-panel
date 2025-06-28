
export interface IGoogleCalendar{
    loading: boolean,
    error: string | null,
    data: [],
    success: boolean | null,
}

export const googleCalendarState : IGoogleCalendar = {
    loading: false,
    error: null,
    data: [],
    success: null,
}