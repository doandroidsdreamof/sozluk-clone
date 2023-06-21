import { BsDroplet, BsFillDropletFill } from "react-icons/bs";
import { api } from "~/utils/api";
import { insertElipsis } from "~/utils/elipsis";

interface FavoriteButtonProps {
  entryId: string;
  id: string;
  favorite: boolean;
}

const FavoriteButton = ({ favorite, id }: FavoriteButtonProps) => {
  const insertFavorite = api.favorite.ceateFavorite.useMutation();

  const handleClick = () => {
    // insertFavorite.mutate({
    //   entryId: entryId,
    //   favoriteId: id,
    // });
  };

  return (
    <div className="flex flex-row items-center ">
      <button className="is-active     mr-auto flex cursor-pointer flex-row rounded  p-2  text-typography-body-light hover:bg-gray-100 hover:text-gray-900  dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white">
        {favorite ? <BsFillDropletFill /> : <BsDroplet />}
      </button>
      {parseInt(id) >= 0 ? (
        <span className=" flex max-w-fit cursor-pointer truncate text-ellipsis rounded-md py-1.5 text-sm text-blue-600  hover:underline dark:text-brandGreen-600">
          {insertElipsis(id, 3)}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FavoriteButton;
