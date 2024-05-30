import React from "react";
import Link from "next/link";

interface IChatLinkProps {
  text: string;
  urlPath: string;
  icon: JSX.Element;
}

const ChatLink = ({ text, urlPath, icon }: IChatLinkProps) => {
  return (
    <Link
      href={`${urlPath}`}
      className="flex items-center gap-1 rounded-md px-2 py-2 text-left text-sm text-blue-600 hover:underline focus:outline-none dark:text-brandGreen-600"
    >
      {icon}
      {text}
    </Link>
  );
};

export default ChatLink;
