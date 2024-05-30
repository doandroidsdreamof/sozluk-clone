import { type NextPage } from "next";
import FeedLayout from "@/components/layouts/FeedLayout";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const { data } = api.topic.getRandomEntriesAndTopics.useQuery();

  return <>{data ? <FeedLayout data={data} /> : <></>}</>;
};

export default Home;
