import React, { useState } from "react";
import { Tasks } from "../../interfaces/tasks";
import TaskModal, { ModalTasksType } from "./shared/TaskModal";
import ButtonDelete from "./layouts/ButtonsTask/ButtonDelete/ButtonDelete";
import ButtonEdit from "./layouts/ButtonsTask/ButtonEdit/ButtonEdit";

export const TaskContainer = ({ task }: { task: Tasks }) => {
const [show, setShow] = useState<{ show: boolean; type: ModalTasksType }>({
    show: false,
    type: ModalTasksType.NULL,
  });

  return (
    <>
      <TaskModal show={show} setShow={setShow} task={task} />
      <div
        className="p-5 rounded-lg flex justify-between bg-gradient-to-tr to-gray-300 from-gray-500"
        key={task.id}
      >
        <section>
          <p className="text-white font-semibold">{task.title}</p>
          <p className="text-gray-300">{task.description}</p>
        </section>
        <section className="flex items-end justify-center gap-3">
          <ButtonDelete setShow={setShow} />
          <ButtonEdit setShow={setShow} />
        </section>
      </div>
    </>
  );
};
