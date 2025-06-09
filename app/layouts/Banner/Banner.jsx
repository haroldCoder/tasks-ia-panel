import Image from 'next/image'
import React from 'react'
import codericon from '@/app/assets/banner/coder.svg'

export default function Banner() {
  return (
    <div className='flex justify-between py-6 px-8 bg-gray-950 text-white'>
        <p className='text-lg font-extralight'>Tasks IA panel</p>
        <Image src={codericon} alt='coder_icon' width={50} height={50} className='rounded-full' />
    </div>
  )
}
