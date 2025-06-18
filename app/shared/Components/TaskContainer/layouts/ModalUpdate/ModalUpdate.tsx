import { Tasks } from "@/app/shared/interfaces/tasks";
import React, { useState } from "react";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";
import Select from "../../../Select/Select";
import { priorityOptions } from "../../constants/priority";
import styles from "./styles/modalUpdate.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { updateTaskThunk } from "@/app/shared/slices/tasks/tasksSlice";

const ModalUpdate = ({ task }: { task: Tasks }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<number>(task.priority);
  const dispatch = useDispatch<AppDispatch>();

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const changePriority = (value: string) => {
    setPriority(parseInt(value));
  };

  const updateTask = async() =>{
    await dispatch(updateTaskThunk({task: {title, description, priority}, id: task.id}));
  }

  return (
    <div className="flex flex-col gap-5 py-10">
      <Input type="text" value={title} onChange={changeTitle} />
      <Input type="text" value={description} onChange={changeDescription} />
      <Select
        id={"priority"}
        defaultOption={"Select priority"}
        options={priorityOptions}
        onChange={changePriority}
        defaultValue={priority.toString()}
      />
      <div className="flex justify-end mt-7">
        <Button onClick={updateTask} className={styles.btn}>Update</Button>
      </div>
    </div>
  );
};

export default ModalUpdate;
