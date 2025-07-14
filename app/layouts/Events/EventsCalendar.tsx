import { getEventsFromCalendarTunk } from "@/app/shared/slices/googleCalendar/googleCalendarSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { useClerk } from "@clerk/nextjs";
import { calendar_v3 } from "googleapis";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import calendarIcon from "@/app/assets/calendarGoogle/calendar.svg";
import ButtonDeleteEvent from "./layout/ButtonDeleteEvent/ButtonDeleteEvent";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Modal from "@/app/shared/Components/Modal/Modal";
import { Spinner } from "@/app/shared/Components/Spinner/Spinner";
import style from "./styles/eventsCalendar.module.css";
import { NotFoundEvents } from "./layout/NotFoundEvents/NotFoundEvents";
import Banner from "../Banner/Banner";

export const EventsCalendar = () => {
  const { dataGet, loadingDelete, successDelete, loadingGet } = useSelector(
    (state: RootState) => state.googleCalendar
  );
  const { user } = useClerk();
  const dispatch = useDispatch<AppDispatch>();
  const [events, setEvents] = useState<Array<calendar_v3.Schema$Event>>([]);

  const getAllEventsTask = async () => {
    await dispatch(
      getEventsFromCalendarTunk({ id_userclerk: user?.id!, forceRefresh: true })
    );
  };

  React.useEffect(() => {
    getAllEventsTask();
  }, [successDelete]);

  React.useEffect(() => {
    const regex = new RegExp("^task.*");
    const filterEvents = dataGet?.filter(
      (event: calendar_v3.Schema$Event) =>
        event.iCalUID && regex.test(event.iCalUID)
    );
    setEvents(filterEvents);
  }, [dataGet]);

  return (
    <>
      <Banner />
      {(loadingDelete || loadingGet) && (
        <Modal
          onClose={() => {}}
          closeIcon={<></>}
          className={style.modal_loading}
        >
          <Spinner size="lg" />
        </Modal>
      )}
      {(events.length > 0 && !loadingGet) ? (
        <div className="flex gap-8 px-9 py-8">
          {events.map((evt) => (
            <Card key={evt.id} className="w-[20%]">
              <CardHeader className="border-b-[1.5px] px-1 mx-4 border-b-gray-600">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold text-white">
                    {evt.summary}
                  </p>
                  <Image
                    alt="icon_calendar_google"
                    src={calendarIcon}
                    width={60}
                    height={60}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-md font-light text-gray-400">
                  {evt.description}
                </p>
                <div className="flex flex-col mt-5">
                  <ScrollArea className="border border-gray-600 rounded-lg p-3 h-[100px]">
                    {evt.attendees?.map((att, index: number) => (
                      <div
                        key={index}
                        className="px-6 py-2 rounded-full bg-gray-600 text-white"
                      >
                        {att.email}
                      </div>
                    ))}
                    <ScrollBar orientation={"horizontal"} />
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <ButtonDeleteEvent eventid={evt.id!} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <NotFoundEvents />
      )}
    </>
  );
};
