import { type NextPage } from "next";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FeedLayout from "~/components/layouts/FeedLayout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.topic.getRandomEntriesAndTopics.useQuery();
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
