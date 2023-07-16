import { useSession } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";
import UserCard from "~/components/common/UserCard";
import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import { chatInterfaceClose } from "~/lib/store/reducers/messageSlice";
import { api } from "~/utils/api";
import ChatSearch from "./ChatSearch";
import ChatBox from "./ChatBox";

const ChatInterface = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  const chatInterfaceState = useAppSelector(
    (state) => state.message.chatInterface
  );
  const chatBoxState = useAppSelector((state) => state.message.chatboxState);

  const { data } = api.message.getUserMessageData.useQuery({
    userName: session.data?.user.name || null,
  });

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
        <div className="flex max-h-[20rem] flex-col overflow-y-auto">
          {data?.length ? (
            <div className="relative flex min-h-[6rem]  w-full cursor-pointer flex-row   justify-between   bg-white  text-sm  shadow-sm dark:bg-bg-secondary-dark dark:hover:bg-bg-alt-dark  ">
              <div className="flex">
                {data &&
                  data.map((item) => (
                    <UserCard
                      email={item.sender.email}
                      reverse={true}
                      userName={item.sender.name}
                      imageURL={item.sender.avatar}
                      urlPath={item.id}
                      key={item.id}
                    />
                  ))}
              </div>
            </div>
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
