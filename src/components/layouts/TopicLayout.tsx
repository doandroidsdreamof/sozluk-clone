import React, { useEffect } from "react";
import { TopicHeader } from "../modules/topic/index";

interface TopicLayoutProps {
  topicId: string;
  topicExist: string;
}

const TopicLayout = ({ topicId, topicExist }: TopicLayoutProps) => {
  return (
    <div className=" flex w-full shrink-0 items-center justify-center gap-4 border text-left">
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
