import { type IEntry } from "@/@types/interface";
import { useRouter } from "next/router";
import RendererFeed from "@/components/modules/textEditor/RendererFeed";
import TopicHeader from "@/components/modules/topic/TopicHeader";

interface IFeedLayoutProps {
  entry: IEntry[];
  topicTitle: string;
  id: string;
}
interface IFeedProps {
  data: IFeedLayoutProps[];
}

const FeedLayout = (data: IFeedProps) => {
  const router = useRouter();
  if (!data) {
    return <></>;
  }

  const handleClick = (url: string) => {
    //TODO hard-coded path
    void router.push(`/topic/${encodeURIComponent(url.replace(/ /g, "+"))}`);
  };

  return (
    <div className="top-0 mx-auto flex min-h-screen w-full flex-col justify-between gap-4 p-3 lg:w-[38rem] lg:-translate-x-3 lg:pl-0">
      <div>
        <div>
          {data != null ? (
            data.data.map((items) => (
              <div key={items.id}>
                <button
                  onClick={() => handleClick(items.topicTitle)}
                  className="h-full w-full cursor-pointer text-left text-typography-body-secondary-light underline dark:text-typography-body-dark"
                >
                  <TopicHeader headerOne={items.topicTitle} />
                </button>
                <RendererFeed {...items} />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
