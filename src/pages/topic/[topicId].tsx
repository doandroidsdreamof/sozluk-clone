import { type NextPage } from "next";
import { useRouter } from "next/router";
import { TopicLayoutNull, TopicLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

const Topic: NextPage = () => {
  const router = useRouter();
  const { topicId, topicExist } = router.query as {
    topicId: string;
    topicExist: string;
  };

  const { data: getData } = api.topic.getSingleTopic.useQuery(topicId);

  return (
    <>
      {getData != null ? (
        <TopicLayout
          topicId={topicId?.replace(/\+/g, " ")}
          topicExist={"true"}
          topicUid={getData.id}
        />
      ) : (
        <TopicLayoutNull
          topicId={topicId?.replace(/\+/g, " ")}
          topicExist={"false"}
        />
      )}
    </>
  );
};

export default Topic;
