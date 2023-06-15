import { type GetServerSideProps, type NextPage } from "next";

import { getSession, useSession } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";
import { FeedLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const { data } = api.entry.getRandomEntries.useQuery();
  const session = useSession();

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return <>{data ? <FeedLayout data={data} /> : <></>}</>;
};

export default Home;
