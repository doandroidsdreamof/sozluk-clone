import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect } from "react";

import Login from "~/components/form/Login";
import { DarkMode, AlertMessage } from "~/components/common";
import { Input } from "~/components/elements";
import Aside from "~/components/module/Aside";
import Register from "~/components/form/Register";
import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import { nanoid } from "nanoid";
import {
  insertNotification,
  removeNotification,
  AlertType
} from "~/lib/store/reducers/notificationSlice";


const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector((state) => state.notification);

  const setAlert = (message: string, alertRaw: AlertType, timeout = 5000) => {
    const uid = nanoid();
    if(typeof alertRaw){
      const alertType = alertRaw.toUpperCase() as AlertType;
      dispatch(insertNotification({ message, uid, alertType }));
      setTimeout(() => dispatch(removeNotification(uid)), timeout);
    }

  };

  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center bg-bg-primary-light dark:bg-bg-primary-dark">
        <button
          onClick={() => setAlert("deneme bir iki", "DANGER", 5000)}
          className="z-50 mb-4 border-2 bg-red-500 text-white"
        >
          ADD ALERT{" "}
        </button>
        <div className="mt-auto w-full ml-auto px-4 md:max-w-fifty">
          {alerts &&
            alerts.map((items) => (
              <AlertMessage
                msg={items.message}
                id={items.uid}
                alertType={items.alertType}
                key={items.uid}
              />
            ))}
        </div>
      </main>
      <DarkMode />
    </>
  );
};

export default Home;
