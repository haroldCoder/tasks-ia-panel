import React from "react";
import { Tasks } from "../../interfaces/tasks";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Button from "../Button/Button";

export const TaskContainer = ({ task }: { task: Tasks }) => {
  return (
    <div
      className="p-5 rounded-lg flex justify-between bg-gradient-to-tr to-gray-300 from-gray-500"
      key={task.id}
    >
      <section>
        <p className="text-white font-semibold">{task.title}</p>
        <p className="text-gray-300">{task.description}</p>
      </section>
      <section className="flex items-end justify-center gap-3">
        <Button className="text-red-600 text-lg">
            <FaTrash />
        </Button>
        <Button className="text-gray-800 text-xl">
            <FaRegEdit />
        </Button>
      </section>
    </div>
  );
};
