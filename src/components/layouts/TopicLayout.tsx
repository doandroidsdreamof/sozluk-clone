import { RendererContainer, TopicEditorContainer } from "../containers/index";
import { TextEditor, TopicHeader } from "../modules/index";
import { TopicStatus } from "../modules/index";

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
      <TopicStatus statusText={createdTopic ? "" : "There is nothing here"} />
      <RendererContainer topicTitle={topicTitle} />
      <TopicEditorContainer>
        <TextEditor topicTitle={topicTitle} />
      </TopicEditorContainer>
    </div>
  );
};

export default TopicLayout;
