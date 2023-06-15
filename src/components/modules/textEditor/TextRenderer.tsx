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

interface TextRendererProps {
  content: string;
  createdAt: Date;
  id: string;
  topic: {
    topicTitle: string;
  };
  user: {
    avatar: string | null;
    name: string;
    id: string;
  };
}

const TextRenderer = ({
  content,
  user,
  createdAt,
  topic,
  id: entryId,
}: TextRendererProps) => {
  const { refetch: refetchEntry } = api.entry.getEntries.useQuery(
    topic.topicTitle
  );
  const { mutate: removeEntry } = api.entry.removeEntry.useMutation();
  const json = JSON.parse(content) as string[];
  const [showMore, setShowMore] = useState<number>(250);
  const [edit, setEdit] = useState(false);

  const output = useMemo(() => {
    const purfied = DOMPurify.sanitize(generateHTML(json, [StarterKit]));
    return purfied;
  }, [json]);

  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleClose = () => {
    setEdit(false);
  };

  const handleRemoveEntry = () => {
    removeEntry(entryId, {
      onSuccess: (data) => {
        if (data.success == true) {
          console.info(data.message);
          refetchEntry().catch((err) => console.error(err));
        } else {
          console.info(data.message);
        }
        setEdit(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="my-4 flex min-h-[10rem] max-w-4xl flex-col justify-between rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-alt-dark   lg:w-[42rem]  ">
      <div className="mt-2">
        <div className="flex flex-row  justify-end">
          <ShareButton />
          <Settings
            key={entryId}
            handleEdit={() => handleEdit()}
            userId={user.id}
            handleRemoveEntry={() => handleRemoveEntry()}
          />
        </div>
        {!edit && typeof output === "string" ? (
          <div
            key={entryId}
            className="prose prose-sm m-2 break-words text-sm dark:text-typography-body-dark dark:prose-headings:text-white dark:prose-strong:text-white "
            dangerouslySetInnerHTML={{
              __html: output.length > 200 ? output.slice(0, showMore) : output,
            }}
          ></div>
        ) : (
          <TextEditor
            handleClose={() => handleClose()}
            entryId={entryId}
            key={user.id}
            entry={output}
            topicTitle={topic.topicTitle}
          />
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
