import React, { useEffect } from "react";
import { TopicHeader, TextEditor } from "../modules/index";
import { TopicContainer, RendererContainer } from "../containers/index";

interface TopicLayoutProps {
  topicId: string;
  topicExist: string;
}

const TopicLayout = ({ topicId, topicExist }: TopicLayoutProps) => {
  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full  flex-col gap-4  p-3  text-left  lg:w-[38rem]      lg:-translate-x-3 lg:pl-0">
      <TopicHeader headerOne={topicId} />
      <div className="h-fit max-w-md overflow-hidden break-all border-2">
        <RendererContainer topicId={topicId} />
      </div>
      <TopicContainer textEditor={<TextEditor topicId={topicId} />} />
    </div>
  );
};

export default TopicLayout;
