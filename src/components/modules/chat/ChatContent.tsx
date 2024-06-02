import Avatar from "@/components/common/Avatar";
import { LOCAL_IMAGE_ALT, LOCAL_IMAGE_PATHS } from "@/constants/staticContents";

interface IChatContentProps {
  messageText: string;
  avatarURL?: string;
  senderUserID: string;
  isChatOwner: boolean;
  senderName: string;
  receiverName: string;
  sentDate: Date;
}

const ChatContent = ({
  messageText,
  avatarURL,
  senderUserID,
  isChatOwner,
  senderName,
  receiverName,
  sentDate,
}: IChatContentProps) => {
  return (
    <div
      className={`flex w-full flex-row py-2 ${
        isChatOwner ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`${isChatOwner ? "order-2" : "order-1"}`}>
        <Avatar
          style="mx-4 block h-10 w-10 cursor-pointer rounded-full object-cover"
          alt={LOCAL_IMAGE_ALT.AVATAR}
          src={LOCAL_IMAGE_PATHS.DEFAULT_AVATAR_SRC}
          fallbackSrc={LOCAL_IMAGE_PATHS.DEFAULT_AVATAR_SRC}
        />
      </div>
      <div
        className={`flex w-fit flex-col rounded-lg  px-2 py-1   ${
          isChatOwner
            ? "order-1 mr-2 bg-brandGreen-600 text-white"
            : "order-2 ml-2 bg-[#717ff8] text-typography-body-strong-dark"
        }`}
      >
        <span
          className={
            isChatOwner
              ? "text-xs text-typography-body-light"
              : "text-xs text-typography-body-strong-dark"
          }
        >
          {senderName}&nbsp;-&nbsp;
          {new Date(sentDate).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span className="font-roboto text-sm">{messageText}</span>
      </div>
    </div>
  );
};

export default ChatContent;
