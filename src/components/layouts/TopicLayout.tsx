import React from "react";

interface TopicLayoutProps {
  topicId: string;
  topicTitle: string;
  topicExist: boolean;
}

const TopicLayout = ({ topicId, topicTitle, topicExist }: TopicLayoutProps) => {
  return <div>TopicLayout</div>;
};

export default TopicLayout;
