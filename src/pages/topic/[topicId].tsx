import { type NextPage } from "next";
import { useRouter } from "next/router";
import TopicLayout from "~/components/layouts/TopicLayout";
import { api } from "~/utils/api";

const Topic: NextPage = () => {
  const router = useRouter();
  const { topicId } = router.query as {
    topicId: string;
  };

  const { data: getData, isLoading } =
    api.topic.getSingleTopic.useQuery(topicId);

  const idTopic = topicId?.replace(/\+/g, " ");

  return (
    <>
      <TopicLayout
        topicTitle={idTopic}
        isLoading={isLoading}
        createdTopic={getData?.topicTitle || null}
      />
    </>
  );
};

export default Topic;
