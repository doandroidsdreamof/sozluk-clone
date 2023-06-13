import React from "react";
import { FiShare2 } from "react-icons/fi";

const ShareButton = () => {
  return (
    <button className="is-active  right-0 flex cursor-pointer rounded  p-2 text-typography-body-light hover:bg-gray-100 hover:text-gray-900  dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white">
      <FiShare2 />
    </button>
  );
};

export default ShareButton;
