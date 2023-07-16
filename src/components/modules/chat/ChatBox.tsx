import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import { useSession } from "next-auth/react";
import ChatInput from "./ChatInput";
import { api } from "~/utils/api";
import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import { setReceiverName } from "~/lib/store/reducers/messageSlice";

const ChatBox = () => {
  const session = useSession();
  const recieverName = useAppSelector((state) => state.message.recieverName);
  const { data: receiverData } = api.user.getReceiver.useQuery({
    userName: recieverName,
  });
  const dispatch = useAppDispatch();
  const { data: chatRoom } = api.message.getChatRoom.useQuery({
    receiverId: receiverData?.id || null,
    senderId: session.data?.user.id || null,
  });
  const utils = api.useContext();
  const { mutate: sendMessage } = api.message.postMessage.useMutation();

  const handleClick = (receiverId: string, message: string) => {
    if (receiverId) {
      sendMessage(
        {
          message: message,
          receiverId: receiverId,
        },
        {
          onSuccess: () => {
            void utils.message.getChatRoom.invalidate({
              receiverId: receiverData?.id,
              senderId: session.data?.user.id,
            });
            void utils.invalidate();
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
  };

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
                  session?.data?.user.id == items.sender.id ? true : false
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
        <ChatInput
          handleClick={handleClick}
          receiverId={receiverData?.id || null}
        />
      </div>
    </div>
  );
};

export default ChatBox;
