import { type GetServerSideProps, type NextPage } from "next";

import { getSession, useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

const Home: NextPage = () => {
  const session = useSession();

  return <></>;
};

export default Home;
