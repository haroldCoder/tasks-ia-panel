import React from 'react'
import Button from '../../../Button/Button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/store/store'
import { deleteTaskThunk } from '@/app/shared/slices/tasks/tasksSlice'

interface Props {
    close: ()=> void,
    idTask: number
}

const ModalRemove = ({close, idTask}: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const removeTask = () =>{
        dispatch(deleteTaskThunk(idTask));
    }

  return (
    <div className='mt-6 flex flex-col gap-5'>
        <div className='flex justify-center'>
            <p>You want to delete this task?</p>
        </div>
        <div className='px-16 gap-3 mt-5 flex justify-between'>
            <Button onClick={close} className='bg-white text-black px-10 py-2'>
                <p>Back</p>
            </Button>
            <Button onClick={removeTask} className='bg-red-600 rounded-lg px-10 py-2'>
                <p>Yes, delete</p>
            </Button>
        </div>
    </div>
  )
}

export default ModalRemove