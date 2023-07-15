import React from "react";
import ChatBubble from "./ChatBubble";
import Button from "../button/Button";
import { BsSendFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import ChatLink from "./ChatLink";

const ChatRoom = () => {
  return (
    <div className="h-full overflow-y-auto border border-cyan-600">
      <div className="flex h-full flex-auto flex-col p-6 ">
        <div className="flex h-full flex-auto flex-shrink-0 flex-col rounded-2xl bg-white p-4  shadow-md dark:bg-[#212121]">
          <div className=""></div>
          <ChatLink urlPath="/message" text={"Back to message"} />
          <div className="mb-4 flex h-full flex-col overflow-x-auto">
            <div className="flex h-full flex-col">
              <div className="grid grid-cols-12 gap-y-2">
                <ChatBubble />
              </div>
            </div>
          </div>
          <div className="flex h-16 w-full flex-row items-center rounded-xl  bg-white px-4 dark:bg-bg-alt-dark">
            <div>
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-100">
                <ImAttachment size={22} />
              </button>
            </div>
            <div className="ml-4 flex-grow">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-xl border border-input-border-light  bg-bg-primary-light pl-4 focus:border-brandGreen-500 focus:outline-none dark:border-input-border-dark  dark:bg-bg-primary-dark dark:text-typography-body-strong-light "
                />
                <button className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-600  dark:hover:text-gray-100">
                  <HiOutlineEmojiHappy size={22} />
                </button>
              </div>
            </div>
            <div className="mb-3 ml-4">
              <button className="sbui-btn-primary  dark ml-auto mt-3  flex max-w-fit cursor-pointer items-center gap-x-2 rounded-md bg-brandGreen-800  px-2.5 py-2 text-sm font-medium text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900">
                <BsSendFill size={15} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
