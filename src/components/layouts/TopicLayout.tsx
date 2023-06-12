import React, { useEffect } from "react";
import { TopicHeader, TextEditor } from "../modules/index";

interface TopicLayoutProps {
  topicId: string;
  topicExist: string;
}

const TopicLayout = ({ topicId, topicExist }: TopicLayoutProps) => {
  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full flex-col gap-4  p-3  text-left  lg:w-[38rem]      lg:-translate-x-3 lg:pl-0">
      <TopicHeader headerOne={topicId} />
      <TextEditor />
    </div>
  );
};

export default TopicLayout;
