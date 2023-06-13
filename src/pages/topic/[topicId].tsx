import { type NextPage } from "next";
import { useRouter } from "next/router";
import { TopicLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

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
        topicUid={getData?.id || null}
        isLoading={isLoading}
      />
    </>
  );
};

export default Topic;
