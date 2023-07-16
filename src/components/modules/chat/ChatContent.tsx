import Avatar from "~/components/common/Avatar";

interface IChatContentProps {
  messageText: string;
  avatarURL?: string;
  senderUserID: string;
  isChatOwner: boolean;
  senderName: string;
  userName: string;
  sentDate: Date;
}

const ChatContent = ({
  messageText,
  avatarURL,
  senderUserID,
  isChatOwner,
  senderName,
  userName,
  sentDate,
}: IChatContentProps) => {
  return (
    <div className="h-64 max-h-64 overflow-auto px-6 py-1">
      <div
        className={`flex w-full flex-row py-2 ${
          isChatOwner ? "justify-end" : "justify-start"
        }`}
      >
        <div className={`${isChatOwner ? "order-2" : "order-1"}`}>
          <Avatar
            style="mx-4 block  h-10 w-10 cursor-pointer  rounded-full object-cover"
            alt="avatar"
            src="/images/default-avatar.png"
            fallbackSrc="/images/default-avatar.png"
          />
        </div>
        <div
          className={`flex w-fit flex-col rounded-lg bg-purple-500 px-2 py-3 text-white ${
            isChatOwner ? "order-1 mr-2" : "order-2 ml-2"
          }`}
        >
          <span className="text-xs text-gray-200">
            {senderName}&nbsp;-&nbsp;
            {new Date(sentDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="text-md">{messageText}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
