import { type GetServerSideProps, type NextPage } from "next";

import { getSession, useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

const Home: NextPage = () => {
  const session = useSession();
  console.log("🚀 ~ file: index.tsx:15 ~ session:", session);

  return <></>;
};

export default Home;
