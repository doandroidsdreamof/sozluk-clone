import React from "react";

interface TopicHeaderProps {
  headerOne: string;
  headerTwo?: string;
}

const TopicHeader = ({ headerOne, headerTwo }: TopicHeaderProps) => {
  return (
    <header className=" mb-4 h-fit    w-full lg:mb-6">
      <h1 className="mb-4 max-w-4xl break-words text-3xl font-bold leading-tight text-typography-body-light dark:text-typography-body-dark lg:mb-6 lg:text-4xl">
        {headerOne}
      </h1>
      <h2 className=" text-lg leading-tight text-typography-body-secondary-dark dark:text-typography-body-secondary-dark lg:mb-6 lg:text-2xl">
        {headerTwo}
      </h2>
    </header>
  );
};

export default TopicHeader;
