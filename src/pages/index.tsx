import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  console.log("test");
  return (
    <>
      <main className="flex  h-screen w-full justify-center bg-bg-alt-dark">
        <button>tesssssssssssssssssssst</button>
      </main>
    </>
  );
};

export default Home;
