import { AppDispatch } from "@/app/store/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export const deleteSuccessEvent = async(data: Array<string> | null, eventId: string, dispatch: AppDispatch, method: ActionCreatorWithPayload<any>) => {
    const newSuccessDelete = data?.filter(
        (evts) => evts !== eventId
    );
    
    await dispatch(
        method({
            status: newSuccessDelete?.length == 0,
            eventsid: newSuccessDelete || [],
        })
    );
}