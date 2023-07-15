import React from "react";
import ChatAside from "../modules/chat/ChatAside";
import dynamic from "next/dynamic";
import ChatRoom from "../modules/chat/ChatRoom";

const NavbarWrapper = dynamic(
  () => import("~/components/modules/navbar/NavbarWrapper"),
  {
    ssr: false,
  }
);

const ChatLayout = () => {
  return (
    <div className="flex min-h-screen  w-full flex-row bg-bg-primary-light dark:bg-bg-primary-dark">
      <div className=" top-0  z-40  order-2 hidden max-h-screen  w-full items-start  lg:block ">
        <ChatRoom />
      </div>
      <div className="w-full lg:w-fit">
        <ChatAside />
      </div>
    </div>
  );
};

export default ChatLayout;
