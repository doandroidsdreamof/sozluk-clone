import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect } from "react";

import Login from "~/components/form/Login";
import { DarkMode } from "~/components/common";
import { Input } from "~/components/elements";
import Aside from "~/components/module/Aside";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center bg-bg-primary-light dark:bg-bg-primary-dark">
        <Aside />
        <DarkMode />
      </main>
    </>
  );
};

export default Home;
