import router from "next/router";
import { useAppDispatch } from "@/lib/store/hooks";
import { api } from "@/utils/api";

interface TopicsProps {
  text: string;
  url: string;
}

const TopicLink = ({ text, url }: TopicsProps) => {
  const utils = api.useContext();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    //TODO hard-coded path
    void router.push(`/topic/${encodeURIComponent(url.replace(/ /g, "+"))}`);
    void utils.entry.getInfitineEntries.invalidate({});
    void utils.entry.getInfitineEntries.prefetchInfinite({
      skip: 0,
      take: 5,
      topicTitle: url || null,
    });
  };

  return (
    <button onClick={handleClick}>
      <p className="line-clamp-2 items-center text-ellipsis break-all rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-bg-alt-dark">
        {text}
      </p>
    </button>
  );
};

export default TopicLink;
