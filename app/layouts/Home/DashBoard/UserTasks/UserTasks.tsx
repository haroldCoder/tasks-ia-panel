import { Spinner } from "@/app/shared/Components/Spinner/Spinner";
import { TaskContainer } from "@/app/shared/Components/TaskContainer/TaskContainer";
import { Tasks } from "@/app/shared/interfaces/tasks";
import { fetchTasks } from "@/app/shared/slices/tasks/tasksSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { useClerk } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const UserTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useClerk();
  const { data, loading } = useSelector((state: RootState) => state.tasks);

  const getAllTasks = async () => {
    await dispatch(
      fetchTasks(
        user!.emailAddresses[0].emailAddress ||
          user!.phoneNumbers[0].phoneNumber
      )
    );
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="p-5">
      {loading ? (
        <div className="flex w-[100%] h-[100%] justify-center items-center">
          <Spinner size="md" color="text-blue-500" />
        </div>
      ) : data.length > 0 ? (
        <div className="w-[40%] flex flex-col gap-4">
          {data.map((tk: Tasks) => (
            <TaskContainer task={tk} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
