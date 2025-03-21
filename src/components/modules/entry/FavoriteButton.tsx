import { BsDroplet, BsFillDropletFill } from "react-icons/bs";
import { api } from "@/utils/api";
import { insertElipsis } from "@/utils/elipsis";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

//TODO function refactor && favorite increment

interface FavoriteButtonProps {
  entryId: string;
  favoriteId?: string;
  favorite: boolean;
  favoriteCount: string;
  userId?: string;
}

const FavoriteButton = ({
  favorite,
  favoriteId,
  entryId,
  favoriteCount,
  userId,
}: FavoriteButtonProps) => {
  const { mutate: insertFavorite } = api.favorite.ceateFavorite.useMutation();
  const utils = api.useContext();
  const [favorited, setFavorited] = useState(false);
  const session = useSession();

  useEffect(() => {
    setFavorited(favorite === true ? true : false);
    if (favorite === true) {
      utils
        .invalidate()
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  }, [favorite]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (favoriteId) {
      insertFavorite(
        {
          entryId: entryId,
          favoriteId: favoriteId,
        },
        {
          onSuccess: () => {
            utils
              .invalidate()
              .then((data) => console.log(data))
              .catch((err) => console.error(err));
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    } else {
      insertFavorite(
        {
          entryId: entryId,
          favoriteId: "",
        },
        {
          onSuccess: () => {
            utils
              .invalidate()
              .then((data) => console.log(data))
              .catch((err) => console.error(err));
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-row items-center">
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className="is-active mr-auto flex cursor-pointer flex-row rounded p-2 text-typography-body-light hover:bg-gray-100 hover:text-gray-900 dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {favorited && userId === session.data?.user.id ? (
          <BsFillDropletFill />
        ) : (
          <BsDroplet />
        )}
      </button>
      {parseInt(favoriteCount) >= 0 ? (
        <span className="flex max-w-fit cursor-pointer truncate text-ellipsis rounded-md py-1.5 text-sm text-blue-600 hover:underline dark:text-brandGreen-600">
          {insertElipsis(favoriteCount, 3)}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FavoriteButton;
