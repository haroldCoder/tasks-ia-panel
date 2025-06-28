import React, { useEffect, useState } from "react";
import styles from "./styles/calendarGoogle.module.css";
import calendarIcon from "@/app/assets/calendarGoogle/calendar.svg";
import Image from "next/image";
import { Tasks } from "../../interfaces/tasks";
import Input from "../../Components/Input/Input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import './styles/calendar.css'
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { createEventOnCalendar } from "../../slices/googleCalendar/googleCalendarSlice";
import { useAuth, useClerk } from "@clerk/nextjs";

export const CalendarGoogle = ({
  title,
  description,
  start_date,
  end_date
}: {
  title: Tasks["title"];
  description: Tasks["description"];
  start_date: string;
  end_date: string;
}) => {
  const [title_event, setTitleEvent] = React.useState(title);
  const [description_event, setDescriptionEvent] = React.useState(description);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useClerk();
  const { getToken } = useAuth();
  const [accessToken, setAccessToken] = useState("");

  const setTitleEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEvent(e.target.value);
  };

  const setDescriptionEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionEvent(e.target.value);
  };

  const getAccessToken = async() =>{
    const token = await getToken({template: "google"});
    setAccessToken(token!);
  }
  
  useEffect(()=>{
    getAccessToken()
  }, [])

  const createEvent = () =>{
    dispatch(createEventOnCalendar({
      id_user: accessToken,
      email: user?.emailAddresses[0].emailAddress!,
      event: {
        summary: title_event,
        description: description_event,
        start: start_date,
        end: end_date,
      }
    }))
  }

  return (
    <div className={styles.containerCalendar}>
      <div className="flex justify-center">
        <Image
          alt="icon_calendar_google"
          src={calendarIcon}
          width={60}
          height={60}
        />
      </div>
      <ScrollArea className="h-[60%] rounded-md scrollarea-custom">
        <div className="flex flex-col gap-4 mt-5 mb-4 px-1">
          <Input
            label={<p>Title</p>}
            className={styles.input}
            type="text"
            value={title_event}
            onChange={setTitleEventHandler}
          />
          <Input
            type="text"
            label={<p>Description</p>}
            className={styles.input}
            value={description_event}
            onChange={setDescriptionEventHandler}
          />
          <Input
            className={styles.input}
            label={<p>Start date</p>}
            type="date"
            disabled
            placeholder="Start Date"
            value={start_date.split("T")[0]}
          />
          <Input
            label={<p>End date</p>}
            className={styles.input}
            type="date"
            disabled
            placeholder="End Date"
            value={end_date.split("T")[0]}
          />
        </div>
      </ScrollArea>
      <div className="sticky top-[100%]">
        <Button onClick={createEvent} className={styles.btn}>
          <span className="text-white">Add to Google Calendar</span>
        </Button>
      </div>
    </div>
  );
};
