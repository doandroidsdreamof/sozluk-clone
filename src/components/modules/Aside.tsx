import { useAppSelector } from "~/lib/store/hooks";
import { IoIosSettings } from "react-icons/io";
import { api } from "~/utils/api";
import { TopicLink } from "../modules/topic/index";

const Aside = () => {
  const toggleState = useAppSelector((state) => state.toggle.navbarState);
  const { data } = api.topic.getAllTopics.useQuery();

  return (
    <aside>
      <div
        className={
          toggleState
            ? "fixed  left-0 z-10   flex max-h-screen min-h-screen  w-fit  bg-bg-primary-light  transition-transform  dark:bg-bg-primary-dark"
            : "fixed  left-0 z-10    flex  max-h-screen min-h-screen  w-fit  -translate-x-full  bg-bg-primary-light   transition-transform dark:bg-bg-primary-dark lg:translate-x-0"
        }
      >
        <div className="flex flex-col overflow-y-auto   border-r border-input-border-dark bg-bg-primary-light dark:bg-bg-primary-dark lg:w-56">
          <div className="flex   h-16  items-center  px-4 pt-2 text-left">
            <span className="px-4 text-lg font-semibold  text-gray-800 dark:text-white">
              Gündem
            </span>
            <IoIosSettings className="-translate-x-2 cursor-pointer  text-gray-800 dark:text-white" />
          </div>
          <nav className="flex flex-1 flex-col space-y-1 px-4 py-2">
            {data &&
              data.map((items) => (
                <TopicLink
                  key={items.id}
                  text={items.topicTitle}
                  url={items.id}
                />
              ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
