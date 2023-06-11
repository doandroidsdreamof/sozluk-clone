import React from "react";

interface TopicHeaderProps {
  headerOne: string;
  headerTwo?: string;
}

const TopicHeader = ({ headerOne, headerTwo }: TopicHeaderProps) => {
  return (
    <header className=" mb-4 lg:mb-6">
      <h1 className="mb-4 text-3xl font-extrabold leading-tight text-typography-body-light dark:text-typography-body-dark lg:mb-6 lg:text-4xl">
        {headerOne}
      </h1>
      <h2 className=" text-xl font-extrabold leading-tight text-typography-body-secondary-dark dark:text-typography-body-secondary-dark lg:mb-6 lg:text-2xl">
        {headerTwo}
      </h2>
    </header>
  );
};

export default TopicHeader;
