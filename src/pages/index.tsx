import { type GetServerSideProps, type NextPage } from "next";

import { getSession, useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import { FeedLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.entry.getRandomEntries.useQuery();
  const session = useSession();

  return <>{data ? <FeedLayout data={data} /> : <></>}</>;
};

export default Home;
