import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { ImAttachment } from "react-icons/im";
import { api } from "~/utils/api";

// TODO enter key

interface IChatInputProps {
  receiverId: string | null;
}

const ChatInput = ({ receiverId }: IChatInputProps) => {
  const [message, setMessage] = useState("");
  const utils = api.useContext();
  const { mutate: sendMessage } = api.message.postMessage.useMutation();

  const handleClick = () => {
    if (receiverId) {
      sendMessage({
        message: message,
        receiverId: receiverId,
      });
      void utils.message.getChatRoom.invalidate({});
      setMessage("");
    }
  };

  return (
    <div className="flex  w-full   flex-row items-center  bg-white  px-4 shadow-md ">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          className="block w-full rounded-lg border border-gray-300 bg-white p-1 pl-10 text-sm text-gray-900 focus:border-brandGreen-600 focus:ring-1 focus:ring-brandGreen-600"
          id="message-box"
        />

        <button className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600  ">
          <HiOutlineEmojiHappy size={22} />
        </button>
      </div>

      <div className="ml-4">
        <button
          disabled={receiverId ? false : true}
          onClick={handleClick}
          className="sbui-btn-primary dark mb-2.5  ml-auto mt-3 flex  max-w-fit cursor-pointer flex-row-reverse items-center gap-x-2  rounded-md bg-brandGreen-800  px-4 py-1.5 text-sm font-medium text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900"
        >
          Send
          <BsSend size={13} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
