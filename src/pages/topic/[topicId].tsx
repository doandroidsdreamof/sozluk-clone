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

  const { data: getData } = api.topic.filterTopic.useQuery(topicId);
  console.info("🚀 ~ file: [topicId].tsx:15 ~ getData:", getData);

  return (
    <>
      {getData ? (
        <TopicLayout
          topicId={topicId?.replace(/\+/g, " ")}
          topicExist={"true"}
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
