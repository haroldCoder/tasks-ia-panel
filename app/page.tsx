"use client";

import Banner from "@/app/layouts/Banner/Banner";
import { useState, useEffect } from "react";
import Login from "@/app/layouts/Auth/Login";
import { SignedIn, SignIn } from "@clerk/nextjs";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <Banner />
        <SignedOut>
          <Login />
        </SignedOut>
      </main>
    </div>
  );
}
