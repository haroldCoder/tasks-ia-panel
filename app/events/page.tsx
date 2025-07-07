"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { EventsCalendar } from "../layouts/Events/EventsCalendar";
import Loading from "./loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <EventsCalendar />
      </Provider>
    </Suspense>
  );
};

export default page;
