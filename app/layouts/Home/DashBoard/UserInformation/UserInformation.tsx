import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react'

const UserInformation = () => {
    const { user } = useClerk(); 

  return (
    <div className='flex flex-col gap-6 p-8 rounded-lg bg-gradient-to-bl from-gray-700 to-gray-950'>
        <Image src={user!.imageUrl} width={50} height={50} className='rounded-full' alt={user!.firstName!.toString()} />
        <div className='flex flex-col gap-3'>
            <b>Full name</b>
           <p>{user?.firstName || "-"} {user?.lastName}</p> 
        </div>
        <div>
            <b>Username</b>
           <p>{user?.username || "-"}</p> 
        </div>
        <div>
            <b>Email</b>
           <p>{user?.emailAddresses[0].emailAddress || "-"}</p> 
        </div>
        <div>
            <b>Phone number</b>
           <p>{user?.phoneNumbers[0]?.phoneNumber || "-"}</p> 
        </div>
    </div>
  )
}

export default UserInformation