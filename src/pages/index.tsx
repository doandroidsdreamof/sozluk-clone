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


  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center bg-bg-primary-light dark:bg-bg-primary-dark">

          <Login />

        <DarkMode />
      </main>

    </>
  );
};

export default Home;
