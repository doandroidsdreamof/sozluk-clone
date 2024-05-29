// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/html";
// Option 1: Browser + server-side
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { useMemo, useState } from "react";
import EntryCard from "../entry/EntryCard";
import ShareButton from "../entry/ShareButton";
import UserCard from "~/components/common/UserCard";
import { CLIENT_ROUTE_PATHS } from "~/constants/staticContents";

interface Entry {
  content: string;
  id: string;
  createdAt: Date;
}

interface TextRendererProps {
  user: {
    name: string;
    id: string;
    avatar: string | null;
  };
  entry: Entry[];
  topicTitle: string;
  id: string;
}

const RendererFeed = ({
  topicTitle,
  user,
  entry,
  id: topicId,
}: TextRendererProps) => {
  const parseContent = { ...entry[0] };
  const json = JSON.parse(parseContent.content as string) as string[];
  const [showMore, setShowMore] = useState<number>(250);

  const output = useMemo(() => {
    const purfied = DOMPurify.sanitize(generateHTML(json, [StarterKit]));
    return purfied;
  }, [json]);

  return (
    <div className="my-4 flex min-h-[10rem] max-w-4xl flex-col justify-between rounded-sm bg-white p-3 text-sm shadow-sm dark:bg-bg-secondary-dark lg:w-[38rem]">
      <div className="mt-2">
        <div className="flex flex-row  justify-end">
          <ShareButton />
        </div>
        {typeof output === "string" ? (
          <div
            className="prose prose-sm m-2 break-words text-sm dark:text-typography-body-dark dark:prose-headings:text-white dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{
              __html: output.length > 200 ? output.slice(0, showMore) : output,
            }}
          ></div>
        ) : (
          <></>
        )}
      </div>
      <EntryCard
        setShowMore={setShowMore}
        showMore={showMore}
        outputLength={output.length}
      >
        <UserCard
          userName={user.name}
          date={parseContent.createdAt}
          imageURL={user.avatar || ""}
          urlPath={CLIENT_ROUTE_PATHS.PROFILE}
        />
      </EntryCard>
    </div>
  );
};

export default RendererFeed;
