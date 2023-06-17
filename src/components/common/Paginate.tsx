import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface PaginateProps {
  lastPage?: string;
  totalPage: number;
  limit: number;
  pageNum: number;
  handleFetchPreviousPage: () => void;
  handleFetchNextPage: () => void;
  handleSelect: (val: string) => void;
}

const Paginate = ({
  handleFetchNextPage,
  handleFetchPreviousPage,
  handleSelect,
  lastPage,
  totalPage,
  limit,
  pageNum,
}: PaginateProps) => {
  const [arr, setArr] = useState<number[]>([]);

  useEffect(() => {
    populateArr(totalPage);
  }, [totalPage]);

  function populateArr(param: number) {
    const parseNum = [];
    while (param > 0) {
      param--;
      parseNum.push(param);
    }
    setArr(parseNum);
  }
  console.info("page", pageNum);
  console.info("total", totalPage);
  console.info("limit", limit);

  return (
    <div className="flex   items-center justify-center font-roboto text-typography-body-light dark:text-typography-body-dark ">
      <button
        onClick={() => handleFetchPreviousPage()}
        className="sbui-btn-primary dark ml-auto  max-w-fit cursor-pointer rounded-sm  bg-brandGreen-800 p-2.5 py-1.5 text-sm text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900"
      >
        <MdNavigateBefore size={18} />
      </button>
      <select
        value={pageNum}
        onChange={(e) => handleSelect(e.target.value)}
        className="ml-2 mr-2 items-center rounded-sm border border-input-border-light bg-bg-primary-light py-1.5 text-center text-sm  dark:border-input-border-dark dark:bg-bg-primary-dark"
      >
        {totalPage ? (
          arr.map((items: number, i) => (
            <option key={i} value={items}>
              {items + 1}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
      /
      <button
        onClick={() => handleFetchNextPage()}
        className="sbui-btn-primary dark ml-2  max-w-fit cursor-pointer rounded-sm  bg-brandGreen-800 p-2.5 py-1.5 text-sm text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900"
      >
        <MdNavigateNext size={18} />
      </button>
    </div>
  );
};

export default Paginate;
