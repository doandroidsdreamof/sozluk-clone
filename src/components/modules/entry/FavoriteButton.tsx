import React from "react";
import { BsFillDropletFill, BsDroplet } from "react-icons/bs";
import { insertElipsis } from "~/utils/elipsis";

interface FavoriteButtonProps {
  favorite: boolean;
  favoriteCount: string;
}

const FavoriteButton = ({ favorite, favoriteCount }: FavoriteButtonProps) => {
  return (
    <div className="flex flex-row items-center ">
      <button className="is-active     mr-auto flex cursor-pointer flex-row rounded  p-2  text-typography-body-light hover:bg-gray-100 hover:text-gray-900  dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white">
        {favorite ? <BsFillDropletFill /> : <BsDroplet />}
      </button>
      {parseInt(favoriteCount) > 0 ? (
        <span className=" flex max-w-fit cursor-pointer truncate text-ellipsis rounded-md py-1.5 text-sm text-blue-600  hover:underline dark:text-brandGreen-600">
          {insertElipsis(favoriteCount, 3)}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FavoriteButton;
