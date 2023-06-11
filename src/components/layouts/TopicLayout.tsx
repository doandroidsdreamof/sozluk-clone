import React, { useEffect } from "react";
import { TopicHeader } from "../modules/topic/index";

interface TopicLayoutProps {
  topicId: string;
  topicExist: string;
}

const TopicLayout = ({ topicId, topicExist }: TopicLayoutProps) => {
  return (
    <div className=" mx-auto flex min-h-screen w-full  gap-4   p-3  text-left  lg:w-[38rem]      lg:-translate-x-3 lg:pl-3">
      <TopicHeader
        headerOne={topicId}
        headerTwo={
          topicExist == "false" ? "ekşi sözlük'te böyle bir başlık yok." : ""
        }
      />
    </div>
  );
};

export default TopicLayout;
