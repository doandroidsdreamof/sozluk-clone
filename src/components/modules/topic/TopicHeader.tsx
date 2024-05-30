import React from "react";

interface ITopicHeaderProps {
  headerOne: string;
}

const TopicHeader = ({ headerOne }: ITopicHeaderProps) => {
  return (
    <header className="mb-4 h-fit w-full lg:mb-6">
      <h1 className="mb-4 max-w-4xl break-words text-3xl font-bold leading-tight text-typography-body-light dark:text-typography-body-dark lg:mb-6 lg:text-4xl">
        {headerOne}
      </h1>
    </header>
  );
};

export default TopicHeader;
