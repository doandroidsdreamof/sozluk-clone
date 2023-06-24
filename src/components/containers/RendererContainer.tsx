import { useEffect, useMemo, useState } from "react";
import { api } from "~/utils/api";
import Paginate from "../common/Paginate";
import TextRenderer from "../modules/textEditor/TextRenderer";

interface RendererContainerProps {
  topicTitle: string;
}

// TODO total page global state

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
      setTotalPage(pageNumber);
    }
  }, [data, page]);

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

  const output = useMemo(() => {
    const memoizedData = data?.pages[page]?.infiniteEntries || null;
    return memoizedData;
  }, [data, page]);

  return (
    <>
      <div>
        {output != null && data ? (
          output?.map((items) => (
            <TextRenderer {...items} key={items.id.toString()} />
          ))
        ) : (
          <></>
        )}
        <></>
      </div>
      <div className=" order-3   flex w-full justify-center md:justify-end  lg:w-[38rem]">
        <Paginate
          limit={limit}
          totalPage={total}
          pageNum={page}
          handleSelect={handleSelect}
          handleFetchNextPage={handleFetchNextPage}
          handleFetchPreviousPage={handleFetchPreviousPage}
        />
      </div>
    </>
  );
};

export default RendererContainer;
