"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { EventsCalendar } from "../layouts/Events/EventsCalendar";
import Loading from "./loading";
import { ClerkProvider } from "@clerk/nextjs"

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ClerkProvider>
        <Provider store={store}>
          <EventsCalendar />
        </Provider>
      </ClerkProvider>
    </Suspense>
  );
};

export default page;
