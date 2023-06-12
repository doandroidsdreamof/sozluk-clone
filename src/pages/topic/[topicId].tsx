import { type NextPage } from "next";
import { useRouter } from "next/router";
import { TopicLayoutNull } from "~/components/layouts/index";
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
      <TopicLayoutNull
        topicId={topicId.replace(/\+/g, " ")}
        topicExist={getData != null ? "true" : "false"}
      />
    </>
  );
};

export default Topic;
