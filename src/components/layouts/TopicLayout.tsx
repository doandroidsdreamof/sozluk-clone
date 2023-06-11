import React, { useEffect } from "react";
import { TopicHeader } from "../modules/topic/index";

interface TopicLayoutProps {
  topicId: string;
  topicExist: string;
}

const TopicLayout = ({ topicId, topicExist }: TopicLayoutProps) => {
  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full gap-4  p-3  text-left  lg:w-[38rem]      lg:-translate-x-3 lg:pl-0">
      <TopicHeader
        headerOne={topicId}
        headerTwo={topicExist == "false" ? "There is nothing here." : ""}
      />
    </div>
  );
};

export default TopicLayout;
