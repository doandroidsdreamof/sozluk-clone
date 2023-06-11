import { type NextPage } from "next";
import { useRouter } from "next/router";
import { TopicLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

const Topic: NextPage = () => {
  const router = useRouter();
  const { topicId, topicExist } = router.query as {
    topicId: string;
    topicExist: string;
  };

  const { data: getData, status } = api.topic.filterTopic.useQuery(topicId);

  return (
    <>
      <TopicLayout
        topicId={topicId}
        topicExist={getData != null ? "true" : "false"}
      />
    </>
  );
};

export default Topic;
