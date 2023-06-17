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
  const { data, fetchNextPage } = api.entry.getInfitineEntries.useInfiniteQuery(
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
      console.info(
        "🚀 ~ file: RendererContainer.tsx:28 ~ useEffect ~ data?.pages[0]?.entryCount:",
        data?.pages[0]?.entryCount
      );
      const pageNumber = Math.ceil(data?.pages[0]?.entryCount / limit);
      setTotalPage(pageNumber);
    }
  }, [page]);

  const handleFetchNextPage = () => {
    fetchNextPage().catch((err) => console.error(err));
    setPage((prev) => (page < total ? prev + 1 : total));
    console.log(page);
    console.log(data?.pages);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => (page > 0 ? prev - 1 : page * 0));
  };

  const handleSelect = (targetVal: string) => {
    setPage(parseInt(targetVal));
  };

  return (
    <>
      <div>
        {data != null ? (
          data?.pages[page]?.infiniteEntries.map((items) => (
            <TextRenderer {...items} key={items.id} />
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
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default RendererContainer;
