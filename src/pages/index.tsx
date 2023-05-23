import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect } from "react";

import Login from "~/components/form/Login";
import { DarkMode,AlertMessage } from "~/components/common";
import { Input } from "~/components/elements";
import Aside from "~/components/module/Aside";
import Register from "~/components/form/Register";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex flex-col-reverse h-screen w-full items-center justify-center bg-bg-primary-light dark:bg-bg-primary-dark">
        <AlertMessage />

        <button className="text-white border-2 border mb-4">ADD ALERT </button>
      </main>
      <DarkMode />
    </>
  );
};

export default Home;
