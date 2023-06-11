import React, { useEffect } from "react";

interface TopicLayoutProps {
  topicId: string;
  topicExist: string;
}

const TopicLayout = ({ topicId, topicExist }: TopicLayoutProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-4 text-center">
      <div className="text-white">{topicId}</div>
      <div className="text-white">{topicExist}</div>
    </div>
  );
};

export default TopicLayout;
