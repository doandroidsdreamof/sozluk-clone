import React from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

interface IChatLinkProps {
  text: string;
  urlPath: string;
}

const ChatLink = ({ text, urlPath }: IChatLinkProps) => {
  return (
    <Link
      href={`${urlPath}`}
      className="w flex  items-center gap-1 rounded-md  px-2   py-2 text-left text-sm text-blue-600 hover:underline  focus:outline-none dark:text-brandGreen-600 "
    >
      <IoMdArrowRoundBack />
      {text}
    </Link>
  );
};

export default ChatLink;
