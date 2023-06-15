import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.
const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

interface ItemsProps {
  currentItems: number[];
}

function Items({ currentItems }: ItemsProps) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: number) => (
          <div key={item} className="">
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}
interface PaginateProps {
  itemsPerPage: number;
}

function Paginate({ itemsPerPage }: PaginateProps) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset: number = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    if (event) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const selectedEl = event.selected as number;
      const newOffset = (selectedEl * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${selectedEl}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    }
  };

  return (
    <div className="pagination mx-auto  ">
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="flex flex-row gap-3 dark:text-white "
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        pageLinkClassName={"page-number"}
        previousLinkClassName={"page-number"}
        nextLinkClassName={"page-number"}
        activeLinkClassName={"active"}
      />
    </div>
  );
}
export default Paginate;
