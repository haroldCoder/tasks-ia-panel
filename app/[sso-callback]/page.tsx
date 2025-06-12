"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { Spinner } from "../shared/Components/Spinner/Spinner";

export default function SSOCallback() {
  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner size="xl" />
      </div>

      <AuthenticateWithRedirectCallback signInForceRedirectUrl="/" />
    </>
  );
}
