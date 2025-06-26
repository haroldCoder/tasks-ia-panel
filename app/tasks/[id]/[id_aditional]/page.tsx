"use client";

import React, { Suspense } from "react";
import Loading from "./loading";
import { AditionalTask } from "@/app/layouts/AditionalTask/AditionalTask";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

const page = ({
  params,
}: {
  params: Promise<{ id: number; id_aditional?: number }>;
}) => {
  const {id, id_aditional} = React.use(params);

  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <AditionalTask id={id} id_aditional={id_aditional} />
      </Provider>
    </Suspense>
  );
};

export default page;
