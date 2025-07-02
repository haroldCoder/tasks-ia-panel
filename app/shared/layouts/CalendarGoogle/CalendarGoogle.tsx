import React, { useEffect } from "react";
import styles from "./styles/calendarGoogle.module.css";
import calendarIcon from "@/app/assets/calendarGoogle/calendar.svg";
import Image from "next/image";
import { Tasks } from "../../interfaces/tasks";
import Input from "../../Components/Input/Input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./styles/calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { createEventOnCalendar, searchEventOnCalendarTunk } from "../../slices/googleCalendar/googleCalendarSlice";
import { useClerk } from "@clerk/nextjs";
import Modal from "../../Components/Modal/Modal";
import { Spinner } from "../../Components/Spinner/Spinner";
import EmailsList from "../../Components/EmailsList/EmailsList";

export const CalendarGoogle = ({
  title,
  description,
  start_date,
  end_date,
  id
}: {
  title: Tasks["title"];
  description: Tasks["description"];
  start_date: string;
  end_date: string;
  id: number
}) => {
  const [title_event, setTitleEvent] = React.useState(title);
  const [description_event, setDescriptionEvent] = React.useState(description);
  const [emails, setEmails] = React.useState<Array<string>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useClerk();
  const { loadingCreate, loadingSearch, successSearch, errorSearch } = useSelector(
    (state: RootState) => state.googleCalendar
  );

  const setTitleEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEvent(e.target.value);
  };

  const setDescriptionEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionEvent(e.target.value);
  };

  const createEvent = () => {
    dispatch(
      createEventOnCalendar({
        id_user: user?.id!,
        email: user?.emailAddresses[0].emailAddress!,
        event: {
          summary: title_event,
          description: description_event,
          start: start_date,
          end: end_date,
          email: emails,
          id: id
        },
      })
    );
  };

  const searchCalendarEvent = async() =>{
    await dispatch(searchEventOnCalendarTunk({ id_userclerk: user?.id!, event_id: `task${id.toString()}` }))
  }

  React.useEffect(() => {
      searchCalendarEvent()
  }, [])

  return (
    <>
      {(loadingCreate || loadingSearch) && (
        <Modal
          className={styles.modal}
          onClose={() => { }}
          closeIcon={<></>}
          title={""}
        >
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        </Modal>
      )}
      {
        !successSearch ?
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
              <EmailsList
                emails={emails}
                label={"Write emails for invitations"}
                change={(values: Array<string>) => setEmails(values)}
              />
            </div>
          </ScrollArea>
          <div className="sticky top-[100%]">
            <Button onClick={createEvent} className={styles.btn}>
              <span className="text-white">Add to Google Calendar</span>
            </Button>
          </div>
        </div>
        : <h2>Event exist</h2>
      }

    </>
  );
};
