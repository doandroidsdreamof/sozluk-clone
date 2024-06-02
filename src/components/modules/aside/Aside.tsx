import { IoIosSettings } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { api } from "@/utils/api";
import TopicLink from "../topic/TopicLink";
import { UI_MESSAGES } from "@/constants/staticContents";
import { useEffect } from "react";
import { navbarClose } from "@/lib/store/reducers/toggleSlice";

// TODO topic not found notification

const Aside = () => {
  const toggleState = useAppSelector((state) => state.toggle.navbarState);
  const filterQueryState = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const { data } = api.topic.getAllTopics.useQuery({
    ...filterQueryState,
  });

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(navbarClose());
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);

  return (
    <aside>
      <div
        className={
          toggleState
            ? "fixed left-0 z-10 flex max-h-screen min-h-screen w-fit bg-bg-primary-light transition-transform dark:bg-bg-primary-dark"
            : "fixed left-0 z-10 flex max-h-screen min-h-screen w-fit -translate-x-full  bg-bg-primary-light transition-transform dark:bg-bg-primary-dark lg:translate-x-0"
        }
      >
        <div className="flex w-52 flex-col overflow-y-auto border-r border-input-border-light bg-bg-primary-light dark:border-input-border-dark dark:bg-bg-primary-dark lg:w-56">
          <div className="flex h-16 items-center  px-4 pt-2 text-left">
            <span className="px-4 text-lg font-semibold text-gray-800 dark:text-white">
              {UI_MESSAGES.TRENDING}
            </span>
            <IoIosSettings className="-translate-x-2 cursor-pointer text-gray-800 dark:text-white" />
          </div>
          <nav className="flex flex-1 flex-col space-y-1 px-4 py-2">
            {data &&
              data.map((items) => (
                <TopicLink
                  key={items.id}
                  text={items.topicTitle}
                  url={items.topicTitle}
                />
              ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
