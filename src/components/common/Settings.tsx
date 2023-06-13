import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "next-auth/react";

const Settings = () => {
  const session = useSession();

  return (
    <>
      {session.data?.user ? (
        <button className="is-active  right-0 flex  cursor-pointer rounded  p-2 text-gray-200 hover:bg-gray-100 hover:text-gray-900  dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white">
          <BsThreeDotsVertical />
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Settings;
