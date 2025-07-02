"use client";

import { MultiSelect } from "@/app/shared/Components/MultiSelect/MultiSelect";
import { Tasks } from "@/app/shared/interfaces/tasks";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { labelOptions } from "./constants/labelsTask";
import { Button } from "@/components/ui/button";
import style from "./styles/task.module.css";
import "./styles/taskAditional.css";
import Modal from "@/app/shared/Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  assignAditionalTaskThunk,
  fetchTaskById,
} from "@/app/shared/slices/tasks/tasksSlice";
import { TypeLabels } from "@/app/shared/enums/typeLabels.enum";
import { Spinner } from "@/app/shared/Components/Spinner/Spinner";
import { CalendarGoogle } from "@/app/shared/layouts/CalendarGoogle/CalendarGoogle";

export const AditionalTask = ({
  id,
  id_aditional,
}: {
  id: Tasks["id"];
  id_aditional?: number;
}) => {
  const [dates, setDates] = React.useState<Date[]>([
    new Date(2025, 5, 12),
    new Date(2025, 6, 24),
  ]);
  const [labels, setLabels] = React.useState<TypeLabels[]>([]);
  const [warning, setWarning] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loadingAssignAditional } = useSelector(
    (state: RootState) => state.tasks
  );
  const { task, loadingTask } = useSelector((state: RootState) => state.tasks);

  React.useEffect(() => {
    dispatch(fetchTaskById(id));
  }, []);

  React.useEffect(() => {
    if (dates[0] > dates[1]) {
      setWarning(true);
    }
  }, [dates]);

  const assignDataAditionalTask = async () => {
    if (dates[0] > dates[1]) {
      setWarning(true);
      return;
    }
    await dispatch(
      assignAditionalTaskThunk({
        id,
        aditionalId: id_aditional,
        aditionalData: {
          start_date: dates[0].toISOString(),
          end_date: dates[1].toISOString(),
          type: labels,
        },
      })
    );
  };

  return (
    <>
      {(warning || loadingAssignAditional) && (
        <Modal
          className={!loadingAssignAditional ? style.modal : style.no_modal}
          title={!loadingAssignAditional ? "Error" : ""}
          closeIcon={loadingAssignAditional && <></>}
          onClose={() => setWarning(false)}
        >
          {!loadingAssignAditional ? (
            <div className="mt-5">
              <p id="text">The start date must be before the end date.</p>
              <p id="text-spc">
                - back to select in calendar, for remove dates selecteds and
                select first calendar after second calendar
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Spinner size="lg" color="text-green-500" />
            </div>
          )}
        </Modal>
      )}
      <div className="p-16 flex justify-between">
        <div>
          <section className="flex gap-16">
            <div className="flex flex-col gap-4">
              <p className="text-white text-lg font-light">
                Select start and end date of task
              </p>
              <Calendar
                mode="multiple"
                numberOfMonths={2}
                defaultMonth={dates[0]}
                required
                selected={dates}
                onSelect={setDates}
                max={2}
                className="rounded-lg border shadow-sm"
              />
              <div />
            </div>
          </section>
          <section className="mt-8 max-w-[30vw]">
            <MultiSelect
              options={labelOptions}
              selected={labels}
              onChange={setLabels}
              placeholder="Select labels for the task"
            />
          </section>
          <section className="w-full flex justify-end absolute bottom-10 right-0 p-4">
            <Button onClick={assignDataAditionalTask} className={style.btn}>
              <p className="text-white">Save</p>
            </Button>
          </section>
        </div>
        <div className="w-[30%] h-[65vh]">
          {loadingTask ? (
            <div className="flex justify-center items-center h-full">
              <Spinner size="md" />
            </div>
          ) : (
            <CalendarGoogle
              start_date={
                dates[0] ? dates[0].toISOString() : new Date().toISOString()
              }
              end_date={
                dates[1] ? dates[1].toISOString() : new Date().toISOString()
              }
              title={task.title}
              description={task.description}
            />
          )}
        </div>
      </div>
    </>
  );
};
