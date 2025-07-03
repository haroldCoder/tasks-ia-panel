import Image from "next/image";
import React from "react";
import calendarIcon from "@/app/assets/calendarGoogle/calendar.svg";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./styles/calendarUploaded.module.css";

const CalendarUploaded = () => {
  return (
    <div className={styles.container}>
      <div className="flex justify-start gap-2 items-center">
        <Image
          alt="icon_calendar_google"
          src={calendarIcon}
          width={60}
          height={60}
        />
        <p className="text-lg font-semibold">Google <span className="text-blue-600">Calendar</span></p>
      </div>

      <section className="flex flex-col items-center gap-6">
        <FaCheckCircle className="text-[60px] text-green-400" />
        <span className="text-[18px] font-light text-gray-500">
          This Event it's already been uploaded
        </span>
      </section>
    </div>
  );
};

export default CalendarUploaded;
