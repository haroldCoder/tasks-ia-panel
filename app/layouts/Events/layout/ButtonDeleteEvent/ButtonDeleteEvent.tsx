import Button from '@/app/shared/Components/Button/Button'
import React from 'react'
import style from "./styles/buttonDelete.module.css"
import { GoTrash } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { deleteEventTunk } from '@/app/shared/slices/googleCalendar/googleCalendarSlice';
import { useClerk } from "@clerk/nextjs"

const ButtonDeleteEvent = ({eventid}: {eventid: string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useClerk()

    const deleteEvent = () =>{
        dispatch(deleteEventTunk({id_user: user?.id!, event_id: eventid}))
    }

  return (
    <Button className={style.btn} onClick={deleteEvent}>
        <GoTrash />
    </Button>
  )
}

export default ButtonDeleteEvent