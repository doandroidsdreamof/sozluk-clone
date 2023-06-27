// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/html";
// Option 1: Browser + server-side
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import EntryCard from "../entry/EntryCard";
import FavoriteButton from "../entry/FavoriteButton";
import Settings from "../entry/Settings";
import ShareButton from "../entry/ShareButton";
import ProfileCard from "../profile/ProfileCard";
import TextEditor from "./TextEditor";

interface User {
  avatar: string | null;
  name: string;
  id: string;
}
interface Favorites {
  id: string;
  favorite: boolean;
  entryId: string;
}

interface TextRendererProps {
  content: string;
  createdAt: Date;
  id: string;
  favorites?: Favorites[];
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
  const [data, setData] = useState("");
  const json = JSON.parse(content) as string[];
  const [showMore, setShowMore] = useState<number>(250);
  const [edit, setEdit] = useState(false);
  const utils = api.useContext();

  useEffect(() => {
    const purfied = DOMPurify.sanitize(generateHTML(json, [StarterKit]));
    setData(purfied);
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
          updateUI();
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
    void utils.entry.getInfitineEntries.invalidate({});
    void utils.topic.getSingleTopic.invalidate(topic.topicTitle);
  }

  return (
    <div className="my-4 flex min-h-[10rem] w-full flex-col justify-between rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-alt-dark   lg:w-[38rem]  ">
      <div className="mt-2">
        <div className="flex flex-row  justify-end">
          <ShareButton />
          <Settings
            handleEdit={() => handleEdit()}
            userId={user.id}
            handleRemoveEntry={() => handleRemoveEntry()}
          />
        </div>
        {!edit && typeof data === "string" ? (
          <div
            className="prose prose-sm m-2 break-words text-sm dark:text-typography-body-dark dark:prose-headings:text-white dark:prose-strong:text-white "
            dangerouslySetInnerHTML={{
              __html: data.length > 200 ? data.slice(0, showMore) : data,
            }}
          ></div>
        ) : (
          <div className="flex items-center overflow-hidden lg:w-[36rem]">
            <TextEditor
              handleClose={() => handleClose()}
              entryId={entryId}
              userId={user.id}
              entry={data}
              topicTitle={topic.topicTitle}
            />
          </div>
        )}
      </div>

      <EntryCard
        setShowMore={setShowMore}
        showMore={showMore}
        outputLength={data.length}
      >
        {favorites?.length ? (
          favorites.map((el, index) => (
            <FavoriteButton
              entryId={el.entryId}
              favorite={el.favorite}
              key={el.id}
              favoriteCount={index.toString()}
              favoriteId={el.id}
            />
          ))
        ) : (
          <FavoriteButton
            entryId={entryId}
            favorite={false}
            favoriteCount={"0"}
          />
        )}
        <ProfileCard
          name={user.name}
          date={createdAt}
          imageURL={user.avatar || ""}
        />
      </EntryCard>
    </div>
  );
};

export default TextRenderer;
