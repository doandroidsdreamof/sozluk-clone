import dynamic from "next/dynamic";
import { UI_MESSAGES } from "@/constants/staticContents";

const TextEditor = dynamic(
  () => import("@/components/modules/textEditor/TextEditor"),
  {
    ssr: true,
  }
);

const TopicStatus = dynamic(
  () => import("@/components/modules/topic/TopicStatus"),
  {
    ssr: true,
  }
);
const TopicHeader = dynamic(
  () => import("@/components/modules/topic/TopicHeader"),
  {
    ssr: true,
  }
);
const TopicEditorContainer = dynamic(
  () => import("@/components/containers/TopicEditorContainer"),
  {
    ssr: true,
  }
);
const RendererContainer = dynamic(
  () => import("@/components/containers/RendererContainer"),
  {
    ssr: true,
  }
);

interface ITopicLayoutProps {
  topicTitle: string;
  isLoading: boolean;
  createdTopic: string | null;
}

const TopicLayout = ({
  topicTitle,
  isLoading,
  createdTopic,
}: ITopicLayoutProps) => {
  if (isLoading) {
    return <></>;
  }

  return (
    <div className="top-0 mx-auto flex min-h-screen w-full flex-col justify-between gap-4 p-3 text-left lg:w-[38rem] lg:-translate-x-3 lg:pl-0">
      <TopicHeader headerOne={topicTitle} />
      <TopicStatus statusText={createdTopic ? "" : UI_MESSAGES.EMPTY_CONTENT} />
      <RendererContainer topicTitle={topicTitle} />
      <TopicEditorContainer>
        <TextEditor topicTitle={topicTitle} />
      </TopicEditorContainer>
    </div>
  );
};

export default TopicLayout;
