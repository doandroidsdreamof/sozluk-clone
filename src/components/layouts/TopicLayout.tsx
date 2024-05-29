import dynamic from "next/dynamic";
import TopicEditorContainer from "../containers/TopicEditorContainer";
import TopicHeader from "../modules/topic/TopicHeader";
import TopicStatus from "../modules/topic/TopicStatus";
import RendererContainer from "../containers/RendererContainer";
import { UI_MESSAGES } from "~/constants/staticContents";

const TextEditor = dynamic(
  () => import("~/components/modules/textEditor/TextEditor"),
  {
    ssr: true,
  }
);

interface TopicLayoutProps {
  topicTitle: string;
  isLoading: boolean;
  createdTopic: string | null;
}

const TopicLayout = ({
  topicTitle,
  isLoading,
  createdTopic,
}: TopicLayoutProps) => {
  if (isLoading) {
    return <></>;
  }

  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full flex-col justify-between gap-4  p-3  text-left  lg:w-[38rem]    lg:-translate-x-3 lg:pl-0">
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
