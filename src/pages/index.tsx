import { type NextPage } from "next";
import { api } from "@/utils/api";
import FeedLayout from "@/components/layouts/FeedLayout";

const Home: NextPage = () => {
  const { data } = api.topic.getRandomEntriesAndTopics.useQuery();

  return <>{data ? <FeedLayout data={data} /> : <></>}</>;
};

export default Home;
