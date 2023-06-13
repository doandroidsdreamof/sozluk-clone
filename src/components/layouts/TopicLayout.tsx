import React, { useEffect } from "react";
import { TopicHeader, TextEditor } from "../modules/index";
import { TopicEditorContainer, RendererContainer } from "../containers/index";

interface TopicLayoutProps {
  topicTitle: string;
  topicUid: string | null;
  isLoading: boolean;
}

const TopicLayout = ({ topicTitle, topicUid, isLoading }: TopicLayoutProps) => {
  if (isLoading) {
    return <></>;
  }
  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full  flex-col gap-4  p-3  text-left  lg:w-[38rem]    lg:-translate-x-3 lg:pl-0">
      <TopicHeader
        headerOne={topicTitle}
        headerTwo={topicUid ? "" : "There is nothing here."}
      />
      <div className="">
        <RendererContainer topicTitle={topicTitle} />
      </div>
      <TopicEditorContainer
        textEditor={<TextEditor topicTitle={topicTitle} />}
      />
    </div>
  );
};

export default TopicLayout;
