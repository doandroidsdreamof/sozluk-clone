import { type NextPage } from "next";
import { useRouter } from "next/router";
import { TopicLayout } from "~/components/layouts/index";

const Topic: NextPage = () => {
  const router = useRouter();
  const { topicId, topicExist } = router.query as {
    topicId: string;
    topicExist: string;
  };

  return (
    <>
      <TopicLayout topicId={topicId} topicExist={topicExist} />
    </>
  );
};

export default Topic;
