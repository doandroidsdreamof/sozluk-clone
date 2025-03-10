import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "isomorphic-dompurify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import EntryCard from "../entry/EntryCard";
import FavoriteButton from "../entry/FavoriteButton";
import Settings from "../entry/Settings";
import ShareButton from "../entry/ShareButton";
import TextEditor from "./TextEditor";
import UserCard from "@/components/common/UserCard";
import { CLIENT_ROUTE_PATHS } from "@/constants/staticContents";

interface IUser {
  avatar: string | null;
  name: string;
  id: string;
}

interface ITextRendererProps {
  content: string;
  createdAt: Date;
  id: string;
  favoriteCount: number;
  topic: {
    topicTitle: string;
    id: string;
  };
  user: IUser;
}

const TextRenderer = ({
  content,
  user,
  createdAt,
  topic,
  favoriteCount,
  id: entryId,
}: ITextRendererProps) => {
  const session = useSession();
  const { mutate: removeEntry } = api.entry.removeEntry.useMutation();
  const { data: favoriteData } = api.favorite.getSingleFavorite.useQuery(
    {
      entryId: entryId,
    },
    {
      enabled: session?.data?.user ? true : false, // Enable query only if user is logged in
    }
  );
  const [data, setData] = useState("");
  const json = JSON.parse(content) as string[];
  const [showMore, setShowMore] = useState<number>(250);
  const [edit, setEdit] = useState(false);
  const utils = api.useContext();

  useEffect(() => {
    //TODO error handling
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
    removeEntry(
      {
        userId: user.id,
        entryId: entryId,
      },
      {
        onSuccess: () => {
          updateUI();
          setEdit(false);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  function updateUI() {
    void utils.entry.getUserEntries.invalidate();
    void utils.entry.getInfitineEntries.invalidate({});
    void utils.topic.getSingleTopic.invalidate(topic.topicTitle);
  }

  return (
    <div className="my-4 flex min-h-[10rem] w-full flex-col justify-between rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-secondary-dark lg:w-[38rem]">
      <div className="mt-2">
        <div className="flex flex-row justify-end">
          <ShareButton />
          <Settings
            handleEdit={() => handleEdit()}
            userId={user.id}
            handleRemoveEntry={() => handleRemoveEntry()}
          />
        </div>
        {!edit && typeof data === "string" ? (
          <div
            className="prose prose-sm m-2 break-words text-sm dark:text-typography-body-dark dark:prose-headings:text-white dark:prose-strong:text-white dark:prose-code:text-typography-body-strong-light dark:prose-li:text-typography-body-dark"
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
        {session.data?.user?.id ? (
          <FavoriteButton
            entryId={entryId}
            favorite={favoriteData?.findSingleFavorite.favorite || false}
            favoriteCount={favoriteCount.toString()}
            favoriteId={favoriteData?.findSingleFavorite.id}
            userId={favoriteData?.findSingleFavorite.userId}
          />
        ) : (
          <></>
        )}
        <UserCard
          userName={user.name}
          date={createdAt}
          imageURL={user.avatar || ""}
          urlPath={CLIENT_ROUTE_PATHS.PROFILE}
        />
      </EntryCard>
    </div>
  );
};

export default TextRenderer;
