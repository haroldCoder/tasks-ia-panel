"use client"

import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { EventsCalendar } from '../layouts/Events/EventsCalendar'

const page = () => {
  return (
    <ClerkProvider>
        <Provider store={store}>
            <EventsCalendar />
        </Provider>
    </ClerkProvider>
  )
}

export default page;
