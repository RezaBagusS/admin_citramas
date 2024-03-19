"use client";

import { FC, useEffect } from "react";
import LeftSideBar from "../components/molecules/leftSideBar";
import Navbar from "../components/molecules/navbar";
import { Provider } from "react-redux";
import store from "../redux/store";
import PopupData from "../components/molecules/PopUpData";
import Toaster from "../components/molecules/toaster";
import { usePathname, useRouter } from "next/navigation";
import { invalidateSession } from "../helpers/sessionHelpers";
import PopUpAdd from "../components/molecules/PopUpAdd";
import PopUpDelete from "../components/molecules/PopUpDelete";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout<FC>({ children }: LayoutProps) {
  const location = usePathname();
  const route = useRouter();
  let persistor = persistStore(store);

  useEffect(() => {
    const getActiveUser = () => {
      const expirationTime = localStorage.getItem("citramas_EP728");

      const hasToken =
        localStorage.getItem("citramas_TN903") &&
        localStorage.getItem("citramas_UD348") &&
        expirationTime !== null &&
        Date.now() < Number(expirationTime) * 1000;

      return hasToken;
    };

    const handleInvalidSession = () => {
      if (!getActiveUser()) {
        alert("You are not logged in, please login first");
        invalidateSession();
        route.push("/");
      }
    };

    handleInvalidSession();
  }, [location]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PopupData />
        <PopUpAdd />
        <PopUpDelete />
        <Toaster />
        <div className="w-full flex bg-slate-100">
          <LeftSideBar />
          <div className="w-full h-screen overflow-x-hidden flex flex-col">
            <Navbar />
            <div className="p-7 w-full">{children}</div>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}
