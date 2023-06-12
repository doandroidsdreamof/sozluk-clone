import React from "react";
import Link from "next/link";

interface TopicsProps {
  text: string;
  url: string;
}

const TopicLink = ({ text, url }: TopicsProps) => {
  //topicExist
  return (
    <Link
      href={{
        pathname: `/topic/${url.replace(/\s/g, "")}`,
      }}
    >
      <p className="line-clamp-2   items-center text-ellipsis  break-all  rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-bg-alt-dark ">
        {text}
      </p>
    </Link>
  );
};

export default TopicLink;
