import React, { useEffect, useState } from "react";
import { Tasks } from "../../interfaces/tasks";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalRemove from "./layouts/ModalRemove/ModalRemove";
import styles from "./styles/taskContainer.module.css"
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Spinner } from "../Spinner/Spinner";
import toast from "react-hot-toast";

enum ModalType {
  NULL,
  DELETE,
  EDIT,
}

export const TaskContainer = ({ task }: { task: Tasks }) => {
  const [show, setShow] = useState<{ show: boolean; type: ModalType }>({
    show: false,
    type: ModalType.NULL,
  });

  const { loadingDelete, succesDelete, errorDelete } = useSelector((state: RootState) => state.tasks)

  const closeModal = () =>{
    setShow((prev)=>{return {type: ModalType.NULL, show:false}})
  }

  const openModal = (type: ModalType) =>{
    setShow((prev)=>{return {type, show: true}})
  }

  useEffect(()=>{
    if(!loadingDelete){
      if(succesDelete){
        toast.success("Tasks deleted successfully")
      }
      if(errorDelete){
        toast.error("Error deleting tasks")
      }
      closeModal();
    }
  }, [errorDelete, succesDelete, loadingDelete])

  return (
    <>
      {show.show && (
        <Modal
          children={
            loadingDelete ?
              <Spinner size="lg" />
            :
            show.type == ModalType.DELETE ? 
            <ModalRemove idTask={task.id} close={closeModal} /> : 
            null
          }
          closeIcon={loadingDelete && <></>}
          onClose={closeModal}
          className={!loadingDelete ? styles.modal : styles.no_modal}
          title={!loadingDelete ? "Warning" : ""}
        />
      )}
      <div
        className="p-5 rounded-lg flex justify-between bg-gradient-to-tr to-gray-300 from-gray-500"
        key={task.id}
      >
        <section>
          <p className="text-white font-semibold">{task.title}</p>
          <p className="text-gray-300">{task.description}</p>
        </section>
        <section className="flex items-end justify-center gap-3">
          <Button onClick={()=>openModal(ModalType.DELETE)} className="text-red-600 text-lg">
            <FaTrash />
          </Button>
          <Button className="text-gray-800 text-xl">
            <FaRegEdit />
          </Button>
        </section>
      </div>
    </>
  );
};
