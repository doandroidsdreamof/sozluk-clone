import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { TextRenderer } from "../modules/index";
import { Paginate } from "../common/index";

interface RendererContainerProps {
  topicTitle: string;
}

const RendererContainer = ({ topicTitle }: RendererContainerProps) => {
  const [page, setPage] = useState(0);
  const { data, fetchNextPage } = api.entry.getInfitineEntries.useInfiniteQuery(
    {
      limit: 10,
      topicTitle: topicTitle || null,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const handleFetchNextPage = () => {
    fetchNextPage().catch((err) => console.error(err));
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => prev - 1);
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
        <Paginate />
      </div>
    </>
  );
};

export default RendererContainer;
