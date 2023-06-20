// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/html";
// Option 1: Browser + server-side
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { useMemo, useState } from "react";
import { Settings } from "~/components/modules/index";
import { api } from "~/utils/api";
import {
  EntryCard,
  FavoriteButton,
  ProfileCard,
  ShareButton,
  TextEditor,
} from "../index";

interface User {
  avatar: string | null;
  name: string;
  id: string;
}
interface Favorites {
  id: string;
  favorite: boolean;
}

interface TextRendererProps {
  content: string;
  createdAt: Date;
  id: string;
  favorites: Favorites[];
  topic: {
    topicTitle: string;
    id: string;
  };
  user: User;
}

const TextRenderer = ({
  content,
  user,
  createdAt,
  topic,
  favorites,
  id: entryId,
}: TextRendererProps) => {
  const { mutate: removeEntry } = api.entry.removeEntry.useMutation();
  const { mutate: removeLastTopic } = api.topic.removeTopic.useMutation();
  const json = JSON.parse(content) as string[];
  const [showMore, setShowMore] = useState<number>(250);
  const [edit, setEdit] = useState(false);
  const utils = api.useContext();

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
          if (data.count === 1) {
            console.info(data.count);
            removeLastTopic(topic.id);
            updateUI();
          }
          console.info(data.message);
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

  function updateUI() {
    void utils.entry.getUserEntries.invalidate();
  }

  return (
    <div className="my-4 flex min-h-[10rem] w-full flex-col justify-between rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-alt-dark   lg:w-[38rem]  ">
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
            userId={user.id}
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
        <FavoriteButton
          id={""}
          favorite={false}
          {...favorites}
          entryId={entryId}
        />
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
