import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { Paginate } from "../common/index";
import { TextRenderer } from "../modules/index";

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
    if (data?.pages[page]?.entryCountPerTopic && data?.pages[0]) {
      const { entryCountPerTopic } = data.pages[0];
      const pageNumber = Math.ceil(entryCountPerTopic / limit);
      console.info(
        "🚀 ~ file: RendererContainer.tsx:32 ~ useEffect ~ totalCount:",
        data?.pages[page]
      );

      setTotalPage(pageNumber);
    }
  }, [page]);

  const handleFetchNextPage = () => {
    fetchNextPage().catch((err) => console.error(err));
    setPage((prev) => (page < total ? prev + 1 : total));
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => (page > 0 ? prev - 1 : page * 0));
  };

  const handleSelect = (targetVal: string) => {
    setPage((prev) => parseInt(targetVal));
  };

  return (
    <>
      <div>
        {data != null ? (
          data?.pages[page]?.infiniteEntries.map((items) => (
            <TextRenderer
              {...items}
              favorites={items.favorites}
              key={items.id}
            />
          ))
        ) : (
          <></>
        )}
        <></>
      </div>
      <div className=" order-3   flex w-full justify-center md:justify-end  lg:w-[38rem]">
        {total >= 2 ? (
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
