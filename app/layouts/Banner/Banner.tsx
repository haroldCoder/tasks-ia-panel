import Image from 'next/image'
import React, { useEffect } from 'react'
import codericon from '@/app/assets/banner/coder.svg'
import { useClerk } from '@clerk/nextjs'
import Button from '@/app/shared/Components/Button/Button';

export default function Banner() {
  const { user } = useClerk();

  return (
    <div className='flex justify-between py-6 px-8 bg-gray-950 text-white'>
        <p className='text-lg font-extralight'>Tasks IA panel</p>
        {
          !user?.imageUrl ?
            <Image src={codericon} alt='coder_icon' width={50} height={50} className='rounded-full' />
          :
          <Button variant='secondary'>
            <Image src={user!.imageUrl} alt={user!.firstName!.toString()} width={50} height={50} className='rounded-full' />
          </Button>
        }
        
    </div>
  )
}
