import { Spinner } from "@/app/shared/Components/Spinner/Spinner";
import ButtonDelete from "@/app/shared/Components/TaskContainer/layouts/ButtonsTask/ButtonDelete/ButtonDelete";
import ButtonEdit from "@/app/shared/Components/TaskContainer/layouts/ButtonsTask/ButtonEdit/ButtonEdit";
import TaskModal, {
  ModalTasksType,
} from "@/app/shared/Components/TaskContainer/shared/TaskModal";
import { Tasks } from "@/app/shared/interfaces/tasks";
import { fetchTasks } from "@/app/shared/slices/tasks/tasksSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClerk } from "@clerk/nextjs";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/userTasks.module.css";
import "./styles/userTasks.css"; // Assuming you have some styles defined in this file
import PriorityIndicator from "@/app/shared/Components/TaskContainer/PriorityIndicator/PriorityIndicator";

export const UserTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useClerk();
  const { data, loading } = useSelector((state: RootState) => state.tasks);
  const [show, setShow] = React.useState<{
    show: boolean;
    type: ModalTasksType;
  }>({
    show: false,
    type: ModalTasksType.NULL,
  });
  const [selectTask, setSelectTask] = React.useState<Tasks | null>(null);

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

  const selectTaskHandler = useCallback(
    (task: Tasks) => {
      setSelectTask(task);
    }, []
  );

  return (
    <div>
      {loading ? (
        <div className="flex w-[100%] h-[100%] justify-center items-center">
          <Spinner size="md" color="text-blue-500" />
        </div>
      ) : data.length > 0 ? (
        <div className="w-[full] flex flex-col gap-4">
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Title</TableHead>
                <TableHead className="w-[40%]">Description</TableHead>
                <TableHead className="w-[20%]">Priority</TableHead>
                <TableHead className="w-[20%]">Delete</TableHead>
                <TableHead className="w-[20%]">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((tk: Tasks, index: number) => (
                <>
                  <TaskModal show={show} setShow={setShow} task={selectTask!} />
                  <TableRow className="h-16" key={tk.id}>
                    <TableCell>{tk.title}</TableCell>
                    <TableCell>{tk.description}</TableCell>
                    <TableCell>
                        <PriorityIndicator priority={tk.priority} />
                    </TableCell>
                    <TableCell>
                      <ButtonDelete setShow={setShow} click={()=>selectTaskHandler(tk)} />
                    </TableCell>
                    <TableCell>
                      <ButtonEdit setShow={setShow} click={()=>selectTaskHandler(tk)} />
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
};
