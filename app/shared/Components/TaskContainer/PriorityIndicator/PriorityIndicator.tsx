import { Tasks } from '@/app/shared/interfaces/tasks'
import React from 'react'
import {Tooltip, TooltipContent} from '@/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { priorityCodes } from '../constants/priorityCodes'

function PriorityIndicator({priority}: {priority: Tasks["priority"]}) {
  return (
    <div style={{margin: "0 auto", width: "fit-content"}}>
    <Tooltip>
        <TooltipTrigger asChild>
            <div className={`w-3 h-3 rounded-full`} style={{background: priorityCodes[priority].color}}></div>
        </TooltipTrigger>
        <TooltipContent>
            <div className='bg-white py-1 px-3 rounded-md'>
               <p className="text-black">{priorityCodes[priority].label}</p> 
            </div>
        </TooltipContent>
    </Tooltip>
    </div>
  )
}

export default PriorityIndicator