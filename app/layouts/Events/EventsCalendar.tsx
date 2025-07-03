import { getEventsFromCalendarTunk } from '@/app/shared/slices/googleCalendar/googleCalendarSlice';
import { RootState } from '@/app/store/store';
import { useClerk } from '@clerk/nextjs';
import React from 'react'
import { useSelector } from 'react-redux'

export const EventsCalendar = () => {
    const { dataGet, loadingGet, errorGet} = useSelector((state: RootState)=> state.googleCalendar);
    const { user } = useClerk();

    React.useEffect(()=>{
        getEventsFromCalendarTunk({id_userclerk: user?.id!});
    }, []);

  return (
    <div>EventsCalendar</div>
  )
}
