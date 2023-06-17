import React from "react";
import Link from "next/link";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface PaginateProps {
  lastPage: string;
  optionNum: string;
}

const Paginate = () => {
  return (
    <div className="flex   items-center justify-center font-roboto text-typography-body-light dark:text-typography-body-dark ">
      <button className="sbui-btn-primary dark ml-auto  max-w-fit cursor-pointer rounded-sm  bg-brandGreen-800 p-2.5 py-1.5 text-sm text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900">
        <MdNavigateBefore size={18} />
      </button>
      <select className="ml-2 mr-2 items-center rounded-sm border border-input-border-light bg-bg-primary-light py-1.5 text-center text-sm  dark:border-input-border-dark dark:bg-bg-primary-dark">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
      /
      <button
        className="sbui-btn-primary m dark ml-2 max-w-fit cursor-pointer rounded-sm border border-input-border-light p-2.5   py-1.5 text-sm dark:border-input-border-dark dark:bg-dark-700 dark:text-typography-body-dark dark:hover:bg-dark-500"
        title="son sayfa"
      >
        6
      </button>
      <button className="sbui-btn-primary dark ml-2  max-w-fit cursor-pointer rounded-sm  bg-brandGreen-800 p-2.5 py-1.5 text-sm text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900">
        <MdNavigateNext size={18} />
      </button>
    </div>
  );
};

export default Paginate;
