import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import { useSession } from "next-auth/react";
import ChatInput from "./ChatInput";
import { api } from "~/utils/api";
import { useAppSelector } from "~/lib/store/hooks";

const ChatBox = () => {
  const session = useSession();
  const recieverName = useAppSelector((state) => state.message.recieverName);
  const { data: receiverData } = api.user.getReceiver.useQuery({
    userName: recieverName,
  });
  const { data: chatRoom } = api.message.getChatRoom.useQuery({
    receiverId: receiverData?.id || null,
    senderId: session.data?.user.id || null,
  });

  return (
    <div className="m fixed bottom-3 right-3 z-[500]  mx-auto  mt-32 w-full max-w-sm rounded-t-md border sm:min-w-[30rem]">
      <div className="relative   bg-bg-secondary-light  shadow-md dark:shadow-none">
        <ChatHeader
          recieverName={receiverData?.name}
          numberOfMessages={chatRoom?.messages?.length || null}
        />
        <div className=" max-h-[25rem] min-h-[15rem] overflow-auto px-6 py-1">
          {chatRoom ? (
            chatRoom.messages.map((items) => (
              <ChatContent
                messageText={items.message}
                senderUserID={items.sender.id}
                isChatOwner={
                  session?.data?.user.id == items.receiver.id ||
                  session?.data?.user.id == items.sender.id
                    ? true
                    : false
                }
                senderName={items.sender.name}
                receiverName={items.receiver.name}
                sentDate={items.createdAt}
                key={items.id}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <ChatInput receiverId={receiverData?.id || null} />
      </div>
    </div>
  );
};

export default ChatBox;
