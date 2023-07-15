import React from "react";
import Avatar from "~/components/common/Avatar";

interface IChatBubbleProps {
  messageText: string;
  avatarURL?: string;
  senderUserID: string;
}

const ChatBubble = () => {
  return (
    <div className="col-start-1 col-end-8 rounded-lg p-3">
      <div className="flex flex-row items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          <Avatar
            style="mx-4 block  h-10 w-10   rounded-full object-cover"
            alt="avatar"
            src="/images/default-avatar.png"
            fallbackSrc="/images/default-avatar.png"
          />
        </div>
        <div className="relative ml-3 rounded-xl bg-white px-4 py-2 text-sm text-typography-body-light shadow-md ">
          <p>Hey How are you today?</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
