import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useEffect } from "react";

import Login from "~/components/form/Login";
import { DarkMode } from "~/components/common";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center bg-bg-primary-light dark:bg-bg-primary-dark">
        <DarkMode />
      </main>
    </>
  );
};

export default Home;
