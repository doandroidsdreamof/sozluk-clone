// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/html";
// Option 1: Browser + server-side
import StarterKit from "@tiptap/starter-kit";
import React, { useMemo, useState } from "react";
import { ProfileCard, EntryCard, ShareButton } from "../index";
import { Settings } from "~/components/common/index";

interface TextRendererProps {
  content: string;
  createdAt: Date;
  user: {
    avatar: string | null;
    name: string;
    id: string;
  };
}

const TextRenderer = ({ content, user, createdAt }: TextRendererProps) => {
  const json = JSON.parse(content) as string[];
  const [showMore, setShowMore] = useState<number>(250);
  const output = useMemo(() => {
    return generateHTML(json, [StarterKit]);
  }, [json]);

  return (
    <div className="my-4 flex min-h-[10rem] max-w-4xl flex-col justify-between rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-alt-dark   lg:w-[42rem]  ">
      <div className="mt-2">
        <div className="flex flex-row  justify-end">
          <ShareButton />
          <Settings userId={user.id} />
        </div>
        {typeof output === "string" ? (
          <div
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
          date={createdAt}
          imageURL={user.avatar || ""}
        />
      </EntryCard>
    </div>
  );
};

export default TextRenderer;
