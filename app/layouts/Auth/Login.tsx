import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function LoginUser() {
  return (
    <div className="flex h-[85vh] justify-center items-center">
      <SignIn />
    </div>
  );
}
