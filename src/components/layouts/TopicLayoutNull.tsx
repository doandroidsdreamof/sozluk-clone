import React, { useEffect } from "react";
import { TopicHeader, TextEditor } from "../modules/index";

interface TopicLayoutNullProps {
  topicId: string;
  topicExist: string;
}

const TopicLayoutNull = ({ topicId, topicExist }: TopicLayoutNullProps) => {
  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full  flex-col items-start justify-between gap-y-12   p-3  text-left  lg:w-[38rem]      lg:-translate-x-3 lg:pl-0">
      <TopicHeader headerOne={topicId} headerTwo={"There is nothing here."} />
      <div className="w-full lg:w-[42rem]">
        <TextEditor topicId={topicId} />
      </div>
    </div>
  );
};

export default TopicLayoutNull;
