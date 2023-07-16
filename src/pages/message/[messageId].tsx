import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";
import ChatLayout from "~/components/layouts/ChatLayout";

const ChatRoom: NextPage = () => {
  const router = useRouter();
  const { messageId } = router.query as {
    messageId: string;
  };

  return (
    <>
      <ChatLayout />
    </>
  );
};

export default ChatRoom;
