import { useAppDispatch } from "@/lib/store/hooks";
import { setFollowers } from "@/lib/store/reducers/followersSlice";
import { api } from "@/utils/api";
import { insertElipsis } from "@/utils/elipsis";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

//TODO refactor
//TODO hard-coded buttons

interface IProfileIndicatorProps {
  entryCount: string;
  followers: string;
  following: string;
  userName: string;
}

const ProfileIndicator = ({
  entryCount,
  followers,
  following,
  userName,
}: IProfileIndicatorProps) => {
  const utils = api.useContext();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const elipsisOffset = 6;

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement;
    if (value === "followers") {
      void router.push(`/followers/${encodeURIComponent(userName)}`);
      dispatch(setFollowers(value));
    }
    if (value === "following") {
      void router.push(`/followers/${encodeURIComponent(userName)}`);
      dispatch(setFollowers(value));
    }
  }, []);

  return (
    <div className="flex flex-row ">
      <span className="flex max-w-fit  rounded-md py-1.5 text-xs text-blue-600  dark:text-brandGreen-600">
        {insertElipsis(entryCount, elipsisOffset)} entry
      </span>
      <button
        onClick={(e) => handleClick(e)}
        value={"followers"}
        className="flex max-w-fit cursor-pointer rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600"
      >
        {insertElipsis(followers, elipsisOffset)} followers
      </button>
      <button
        onClick={(e) => handleClick(e)}
        value={"following"}
        className="flex max-w-fit cursor-pointer truncate text-ellipsis rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600"
      >
        {insertElipsis(following, elipsisOffset)} following
      </button>
    </div>
  );
};

export default ProfileIndicator;
