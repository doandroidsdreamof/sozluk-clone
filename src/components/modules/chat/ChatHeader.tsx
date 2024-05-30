import React from "react";
import Avatar from "@/components/common/Avatar";
import { AiOutlineClose } from "react-icons/ai";
import { chatBoxClose } from "@/lib/store/reducers/messageSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { LOCAL_IMAGE_ALT, LOCAL_IMAGE_PATHS } from "@/constants/staticContents";

interface IChatHeaderProps {
  receiverName?: string;
  numberOfMessages: number | null;
}

//TODO avatar && userName => profile link

const ChatHeader = ({ receiverName, numberOfMessages }: IChatHeaderProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full flex-row items-center justify-between rounded-t-md border-b-2 border-b-gray-200 bg-white px-6 py-3.5">
      <div className="flex flex-row items-center">
        <Avatar
          style="mx-4 block h-8 w-8 cursor-pointer rounded-full object-cover"
          alt={LOCAL_IMAGE_ALT.AVATAR}
          src={LOCAL_IMAGE_PATHS.DEFAULT_AVATAR_SRC}
          fallbackSrc={LOCAL_IMAGE_PATHS.DEFAULT_AVATAR_SRC}
        />
        <div className="flex flex-col">
          <p className="text-xs text-gray-600">{receiverName}</p>
          <p className="text-xs text-gray-400">
            {numberOfMessages ? numberOfMessages : 0} messages
          </p>
        </div>
      </div>
      <div className="space-x-1">
        <button
          type="button"
          onClick={() => dispatch(chatBoxClose())}
          className=" inline-flex items-center rounded-full p-1.5 text-center text-sm font-medium  text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <AiOutlineClose size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
