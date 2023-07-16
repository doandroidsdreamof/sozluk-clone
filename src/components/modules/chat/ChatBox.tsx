import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import { useSession } from "next-auth/react";
import ChatInput from "./ChatInput";

const ChatBox = () => {
  const session = useSession();

  return (
    <div className="fixed bottom-3 right-3 z-[500]   mx-auto  mt-32 w-full max-w-sm rounded-t-md border sm:min-w-[30rem]">
      <div className="relative  bg-bg-secondary-light  shadow-md dark:shadow-none">
        <ChatHeader name={"devlazar"} numberOfMessages={0} />
        <ChatContent
          messageText={""}
          senderUserID={""}
          isChatOwner={false}
          senderName={""}
          userName={""}
          sentDate={new Date()}
        />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatBox;
