import React from "react";
import Button from "../../../../Button/Button";
import { FaRegEdit } from "react-icons/fa";
import {
  ModalTasksType,
  TaskModalProps,
  useTaskModalControls,
} from "../../../shared/TaskModal";

function ButtonEdit({
  setShow,
  click,
}: {
  setShow: TaskModalProps["setShow"];
  click?: () => void;
}) {
  const { openModal } = useTaskModalControls(setShow);

  return (
    <Button
      onClick={() => {
        openModal(ModalTasksType.EDIT);
        click && click();
      }}
      className="text-gray-800 text-xl"
    >
      <FaRegEdit />
    </Button>
  );
}

export default ButtonEdit;
