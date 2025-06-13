import React from 'react'
import UserInformation from './UserInformation/UserInformation'
import { UserTasks } from './UserTasks/UserTasks'

export const DashBoard = () => {
  return (
    <div className='w-[100%] flex justify-between h-[73vh]'>
      <section className='w-[70%] bg-[#3d3d3d25] mr-4 rounded-lg'>
        <UserTasks />
      </section>
      <section className='w-[30%]'>
        <UserInformation />
      </section>
    </div>
  )
}
