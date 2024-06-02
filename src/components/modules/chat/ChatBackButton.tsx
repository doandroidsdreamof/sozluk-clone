import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ChatBackButton = () => {
  return (
    <button
      className={
        "z-50 flex items-center bg-brandGreen-700 p-3 text-sm text-white hover:bg-green-600"
      }
    >
      <AiOutlineArrowLeft size={15} />
    </button>
  );
};

export default ChatBackButton;
