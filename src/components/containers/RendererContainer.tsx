import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import { api } from "~/utils/api";
import Paginate from "../common/Paginate";
import TextRenderer from "../modules/textEditor/TextRenderer";
import { refetchData } from "~/lib/store/reducers/refetchSlice";

interface RendererContainerProps {
  topicTitle: string;
}

const RendererContainer = ({ topicTitle }: RendererContainerProps) => {
  const [page, setPage] = useState(0);
  const [total, setTotalPage] = useState(0);
  const [take, setTake] = useState(5); //* resultsPerPage
  const [skip, setSkip] = useState(0);
  const stateEntry = useAppSelector((state) => state.refetch);
  const dispatch = useAppDispatch();
  const utils = api.useContext();

  const { data, fetchNextPage } = api.entry.getInfitineEntries.useInfiniteQuery(
    {
      take: take,
      skip: skip,
      topicTitle: topicTitle || null,
    }
  );

  useEffect(() => {
    if (data?.pages[0]) {
      const { totalCount } = data.pages[0];
      const pageNumber = Math.ceil(totalCount / take);
      setTotalPage(pageNumber);
      setSkip(take * page);
    }
    if (data?.pages[0]?.infiniteEntries.length === 0) {
      setSkip(0);
      setTake(5);
      setPage(0);
      return;
    }
  }, [data, page]);

  const handleSelect = (targetVal: string) => {
    setPage((prev) => parseInt(targetVal));
  };

  const handleFetchPreviousPage = useCallback(() => {
    setPage((prev) => (page > 0 ? prev - 1 : page * 0));
  }, [page]);

  const handleFetchNextPage = () => {
    fetchNextPage().catch((err) => console.error(err));
    setPage((prev) => (page < total ? prev + 1 : total));
  };

  const output = useMemo(() => {
    const memoizedData = data?.pages[0]?.infiniteEntries || null;
    return memoizedData;
  }, [data, page]);

  return (
    <>
      <div className="mb-auto">
        {output != null ? (
          output?.map((items) => <TextRenderer {...items} key={items.id} />)
        ) : (
          <></>
        )}
        <></>
      </div>
      <div className="order-3 flex w-full justify-center md:justify-end lg:w-[38rem]">
        <Paginate
          totalPage={total}
          pageNum={page}
          handleSelect={(val) => handleSelect(val)}
          handleFetchNextPage={handleFetchNextPage}
          handleFetchPreviousPage={handleFetchPreviousPage}
        />
      </div>
    </>
  );
};

export default RendererContainer;
