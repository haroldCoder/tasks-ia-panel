import React from "react";
import Button from "../../../../Button/Button";
import {
  ModalTasksType,
  TaskModalProps,
  useTaskModalControls,
} from "../../../shared/TaskModal";
import { FaTrash } from "react-icons/fa";

const ButtonDelete = ({ setShow, click }: { setShow: TaskModalProps["setShow"], click?: ()=>void }) => {
  const { openModal } = useTaskModalControls(setShow);

  return (
    <Button
      onClick={() => {
        openModal(ModalTasksType.DELETE)
        click && click();
      }}
      className="text-gray-200 text-[17px] hover:text-red-700"
    >
      <FaTrash />
    </Button>
  );
};

export default ButtonDelete;
