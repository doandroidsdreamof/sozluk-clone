import { useSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";
import UserCard from "@/components/common/UserCard";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  chatBoxOpen,
  chatInterfaceClose,
  setReceiverName,
} from "@/lib/store/reducers/messageSlice";
import { api } from "@/utils/api";
import ChatSearch from "./ChatSearch";
import ChatBox from "./ChatBox";

const ChatInterface = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const chatInterfaceState = useAppSelector(
    (state) => state.message.chatInterface
  );
  const chatBoxState = useAppSelector((state) => state.message.chatboxState);
  const { data } = api.message.getUserMessageData.useQuery(
    {
      userName: session.data?.user.name || null,
    },
    {
      enabled: session?.data?.user ? true : false, // Enable query only if user is logged in
    }
  );
  const utils = api.useContext();
  const { mutate: sendMessage } = api.message.postMessage.useMutation();

  return (
    <>
      <div
        className={
          chatInterfaceState
            ? "fixed bottom-3  right-3 z-[500]  w-96 max-w-sm list-none divide-y overflow-hidden rounded  bg-white text-base  shadow-lg"
            : "hidden"
        }
      >
        <div className=" mb-4 flex flex-row items-center justify-between py-2 pl-6 pr-2 text-center font-helvetica text-sm font-light ">
          <h3>Messages</h3>
          <button
            type="button"
            onClick={() => dispatch(chatInterfaceClose())}
            className=" inline-flex  items-center rounded-full p-1.5 text-center text-sm font-medium  text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <AiOutlineClose size={16} />
          </button>
        </div>
        <div className="mb-4">
          <ChatSearch />
        </div>
        <div className="flex  max-h-[20rem] w-full flex-col overflow-y-auto">
          {data?.length ? (
            <>
              {data &&
                data.map((item) => (
                  <button
                    onClick={() => {
                      dispatch(setReceiverName(item.users[0]?.name));
                      dispatch(chatInterfaceClose());
                      dispatch(chatBoxOpen());
                    }}
                    className="relative  flex   min-h-[6rem] w-full  cursor-pointer   items-center    bg-white  text-sm  shadow-sm  hover:bg-brandGreen-500"
                    key={item.users[0]?.id}
                  >
                    <UserCard
                      reverse={true}
                      userName={item.users[0]?.name || ""}
                      imageURL={item.users[0]?.avatar}
                      chatBox={true}
                    />
                  </button>
                ))}
            </>
          ) : (
            <div className="relative flex h-[5rem] cursor-default select-none items-center justify-center bg-bg-primary-light px-4 py-4 text-center  text-gray-700  ">
              Nothing found.
            </div>
          )}
        </div>
      </div>
      {chatBoxState === true && chatInterfaceState === false ? (
        <ChatBox />
      ) : (
        <></>
      )}
    </>
  );
};

export default ChatInterface;
