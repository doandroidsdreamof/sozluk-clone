import ChatLink from "./ChatLink";
import ChatSearch from "./ChatSearch";
import UserCard from "~/components/common/UserCard";

const ChatAside = () => {
  return (
    <aside>
      <div
        className={
          "relative  left-0 z-10 flex max-h-screen min-h-screen border border-red-500 bg-bg-primary-light dark:bg-bg-primary-dark  md:w-full    lg:w-fit"
        }
      >
        <div className="flex  w-full flex-col  overflow-y-auto border-r border-input-border-light bg-bg-primary-light pt-4 dark:border-input-border-dark dark:bg-bg-primary-dark lg:w-[26.125rem]">
          <div className=" ml-3">
            <ChatLink urlPath="/" text={"Back to home"} />
          </div>
          <div className="flex h-16 items-center px-4 pt-2 text-left">
            <ChatSearch />
          </div>
          <nav className="flex flex-1  flex-col space-y-1 px-4 py-2">
            <div className="relative flex min-h-[6rem] w-full cursor-pointer flex-row  justify-between rounded-lg  bg-white  p-3 text-sm  shadow-sm dark:bg-bg-secondary-dark dark:hover:bg-bg-alt-dark  ">
              <div className="flex">
                <UserCard
                  email={"mutlukuytuoglu@gmail.com"}
                  reverse={true}
                  userName={"berkay"}
                  imageURL={""}
                  urlPath="/"
                />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default ChatAside;
