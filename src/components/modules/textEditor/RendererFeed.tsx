// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/html";
// Option 1: Browser + server-side
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useMemo, useState } from "react";
import { ProfileCard, EntryCard, ShareButton } from "../index";
import { Settings } from "~/components/common/index";
import { useAppSelector } from "~/lib/store/hooks";
import { TextEditor } from "../index";
import { api } from "~/utils/api";
import DOMPurify from "isomorphic-dompurify";

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
    <div className="my-4 flex min-h-[10rem] max-w-4xl flex-col justify-between rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-alt-dark   lg:w-[42rem]  ">
      <div className="mt-2">
        <div className="flex flex-row  justify-end">
          <ShareButton />
        </div>
        {typeof output === "string" ? (
          <div
            key={parseContent.id}
            className="prose prose-sm m-2 break-words text-sm dark:text-typography-body-dark dark:prose-headings:text-white dark:prose-strong:text-white "
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
        <ProfileCard
          key={user.id}
          name={user.name}
          date={parseContent.createdAt}
          imageURL={user.avatar || ""}
        />
      </EntryCard>
    </div>
  );
};

export default RendererFeed;
