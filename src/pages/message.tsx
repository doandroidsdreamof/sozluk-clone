import { type NextPage } from "next";
import dynamic from "next/dynamic";

const ChatLayout = dynamic(() => import("~/components/layouts/ChatLayout"), {
  ssr: false,
});

const Message: NextPage = () => {
  return (
    <>
      <ChatLayout />
    </>
  );
};

export default Message;
