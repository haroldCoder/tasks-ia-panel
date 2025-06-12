"use client";

import Banner from "@/app/layouts/Banner/Banner";
import Login from "@/app/layouts/Auth/Login";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import DashBoard from "./layouts/Home/DashboardView";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
        <main>
          <Banner />
          <SignedOut>
            <Login />
          </SignedOut>
          <SignedIn>
            <DashBoard />
          </SignedIn>
        </main>
      </div>
    </Provider>
  );
}
