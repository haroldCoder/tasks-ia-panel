

import React, { useCallback, useEffect, useState } from 'react'
import Modal from '../../Modal/Modal';
import { Spinner } from '../../Spinner/Spinner';
import ModalRemove from '../layouts/ModalRemove/ModalRemove';
import ModalUpdate from '../layouts/ModalUpdate/ModalUpdate';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Tasks } from '@/app/shared/interfaces/tasks';
import styles from '../styles/taskContainer.module.css';

export enum ModalTasksType {
  NULL,
  DELETE,
  EDIT,
}

export interface TaskModalProps{
    task: Tasks,
    show: { show: boolean; type: ModalTasksType },
    setShow: React.Dispatch<React.SetStateAction<{ show: boolean; type: ModalTasksType }>>
}

export const TaskModal = ({task, show, setShow} : TaskModalProps) => {
  const {
    loadingDelete,
    loadingUpdate,
  } = useSelector((state: RootState) => state.tasks);
  const {closeModal} = useTaskModalControls(setShow);

  useEffect(() => {
    if (!loadingDelete) {
      closeModal();
    }
  }, [loadingDelete]);

  useEffect(() => {
    if (!loadingUpdate) {
      closeModal();
    }
  }, [loadingUpdate]);

  return (
    <>
      {show.show && (
        <Modal
          children={
            loadingDelete || loadingUpdate ? (
              <Spinner size="lg" />
            ) : show.type == ModalTasksType.DELETE ? (
              <ModalRemove idTask={task.id} close={closeModal} />
            ) : (
              <ModalUpdate task={task} />
            )
          }
          closeIcon={loadingDelete || (loadingUpdate && <></>)}
          onClose={closeModal}
          className={
            !loadingDelete && !loadingUpdate
              ? show.type == ModalTasksType.DELETE
                ? styles.modal
                : styles.modal_edit
              : styles.no_modal
          }
          title={
            !loadingDelete && !loadingUpdate
              ? show.type == ModalTasksType.DELETE
                ? "Warning"
                : "Update task"
              : ""
          }
        />
      )}
      </>
  )  
}

export const useTaskModalControls = (setShow: TaskModalProps["setShow"]) => {
  const closeModal = useCallback(() => {
    setShow({ type: ModalTasksType.NULL, show: false });
  }, [setShow]);

  const openModal = useCallback((type: ModalTasksType) => {
    setShow({ type, show: true });
  }, [setShow]);

  return { openModal, closeModal };
};

export default TaskModal