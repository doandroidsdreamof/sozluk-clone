import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { TextRenderer } from "../modules/index";
import { Paginate } from "../common/index";

interface RendererContainerProps {
  topicTitle: string;
}

const RendererContainer = ({ topicTitle }: RendererContainerProps) => {
  const [page, setPage] = useState(0);
  const [total, setTotalPage] = useState(0);
  const limit = 5;
  const { data, fetchNextPage, refetch } =
    api.entry.getInfitineEntries.useInfiniteQuery(
      {
        limit: limit,
        topicTitle: topicTitle || null,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  useEffect(() => {
    if (data?.pages[0]?.entryCount) {
      const pageNumber = Math.ceil(data?.pages[0]?.entryCount / limit);
      setTotalPage(pageNumber);
    }
  }, [data?.pages[0]?.entryCount]);

  const handleFetchNextPage = () => {
    fetchNextPage().catch((err) => console.error(err));
    setPage((prev) => prev + 1);
    console.log(page);
    console.log(data?.pages);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSelect = (targetVal: string) => {
    setPage(parseInt(targetVal));
  };
  const handleLastPage = () => {
    setPage(total - 1);
  };

  function refetchQuery() {
    refetch({
      refetchPage: (el, index) => index === page,
    }).catch((err) => console.error(err));
  }

  return (
    <>
      <div>
        {data != null ? (
          data?.pages[page]?.infiniteEntries.map((items) => (
            <TextRenderer
              refetchQuery={() => refetchQuery()}
              {...items}
              key={items.id}
            />
          ))
        ) : (
          <></>
        )}
        <></>
      </div>
      <div className=" order-3   flex w-full justify-center md:justify-end  lg:w-[42rem]">
        {total > 1 ? (
          <Paginate
            limit={limit}
            totalPage={total}
            pageNum={page}
            handleSelect={handleSelect}
            handleFetchNextPage={handleFetchNextPage}
            handleFetchPreviousPage={handleFetchPreviousPage}
            handleLastPage={handleLastPage}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default RendererContainer;
