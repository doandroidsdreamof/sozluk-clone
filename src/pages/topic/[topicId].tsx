import { type NextPage } from "next";
import { useRouter } from "next/router";
import { TopicLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Topic(props: unknown) {
  console.info("🚀 ~ file: [topicId].tsx:17 ~ Topic ~ props:", props);
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
}
