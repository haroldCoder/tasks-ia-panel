import { Spinner } from '@/app/shared/Components/Spinner/Spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <Spinner size="lg" />
    </div>
  )
}
