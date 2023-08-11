import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import FeedLayout from "~/components/layouts/FeedLayout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.topic.getRandomEntriesAndTopics.useQuery();
  const session = useSession();

  return <>{data ? <FeedLayout data={data} /> : <></>}</>;
};

export default Home;
