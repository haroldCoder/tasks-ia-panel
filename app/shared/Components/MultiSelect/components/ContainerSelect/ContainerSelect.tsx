import React from 'react'
import style from "./styles/containerSelect.module.css"
import { IoIosClose } from "react-icons/io";
import Button from '../../../Button/Button';

function ContainerSelect({ value, remove } : { value: string, remove: ()=>void }) {
  return (
    <div className={style.container} data-slot={"container-select"}>
        {value}
        <Button onClick={remove}>
            <IoIosClose className='text-xl' />
        </Button>
    </div>
  )
}

export default ContainerSelect