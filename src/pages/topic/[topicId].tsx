import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";

const TopicLayout = dynamic(() => import("~/components/layouts/TopicLayout"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

const Topic: NextPage = () => {
  const router = useRouter();
  const { topicId } = router.query as {
    topicId: string;
  };

  const { data: getData, isLoading } =
    api.topic.getSingleTopic.useQuery(topicId);

  return (
    <>
      <TopicLayout
        topicTitle={topicId?.replace(/\+/g, " ")}
        isLoading={isLoading}
        createdTopic={getData?.topicTitle || null}
      />
    </>
  );
};

export default Topic;
