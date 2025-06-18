import React from 'react'
import styles from "./styles/modal.module.css"
import Button from '../Button/Button'
import { IoCloseOutline } from 'react-icons/io5'

interface ModalProps{
    title?: string,
    children: React.ReactNode | any,
    closeIcon?: React.ReactNode | any,
    onClose: () => void,
    className?: any 
}

const Modal = ({title, children, closeIcon, onClose, className} : ModalProps) => {
  return (
    <div className={styles.delay}>
        <div className={`${className} ${styles.modal_container}`}>
            <div className='flex justify-between'>
                <div className='flex justify-center w-[90%]'>
                    <p>{title}</p>
                </div>
                <Button onClick={onClose}>
                   {closeIcon ? closeIcon : <IoCloseOutline className='text-gray-200 text-[25px]' />} 
                </Button>
            </div>
            <div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal