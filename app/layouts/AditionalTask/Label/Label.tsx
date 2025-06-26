import React from 'react'
import { LabelType } from '../constants/labelsTask'
import { MdOutlineMenuBook, MdOutlineWorkOutline } from "react-icons/md";
import { IoPersonAddOutline } from 'react-icons/io5';
import { BsCalendar4Event } from "react-icons/bs";
import { AiOutlineProject } from "react-icons/ai";
import { BiSolidTachometer } from "react-icons/bi";

const Label = ({value}: {value: LabelType}) => {
  return (
    value == LabelType.Study ? (
        <MdOutlineMenuBook className='text-yellow-300' />
    ) :
    value == LabelType.Work ? (
        <MdOutlineWorkOutline className='text-blue-600' />
    ) :
    value == LabelType.Personal ? (
        <IoPersonAddOutline className='text-gray-500' />
    ) :
    value == LabelType.Events ? (
        <BsCalendar4Event className='text-red-500' />
    ) :
    value == LabelType.Project ? (
        <AiOutlineProject className='text-green-500' />
    ) :
    value == LabelType.Recurrent ? (
        <BiSolidTachometer className='text-gray-700' />
    ) : (
        null
    )
  )
}

export default Label