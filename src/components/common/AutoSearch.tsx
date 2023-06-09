/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Combobox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { HiOutlineSearch } from "react-icons/hi";

interface SearchOptions {
  id: string;
  topicTitle: string;
}

const AutoSearch = () => {
  const router = useRouter();
  const [data, setData] = useState<SearchOptions[]>([]);
  const [input, setInput] = useState<string>("");
  const {
    data: getData,
    refetch,
    status,
  } = api.topic.filterTopic.useQuery(input);

  useEffect(() => {
    if (getData != null && status === "success") {
      setData(getData);
    }
  }, [status, input]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.target != null) {
      const { value, id }: { value: string | null; id: string | null } =
        e.target as HTMLInputElement;
      if (typeof value === "string" && typeof id === "string") {
        setData([]);
        void router.push({
          pathname: "/topic/[topicId]",
          query: {
            topicId: id,
            topicTitle: value,
          },
        });
      }
    }
  };

  const filteredPeople = () => {
    console.info(data);
    input === ""
      ? data
      : data.filter((items) => {
          return items.topicTitle.toLowerCase().includes(input.toLowerCase());
        });
  };

  return (
    <>
      <div className=" mx-auto   w-seventy md:w-sixty lg:w-fifty   ">
        <Combobox value={data} onChange={filteredPeople}>
          <div className="relative mt-1 ">
            <div className="relative flex w-full   cursor-default items-center overflow-hidden rounded-md   text-left focus:outline-none   focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 dark:border-input-border-dark dark:opacity-50 sm:text-sm">
              <HiOutlineSearch className=" absolute z-40 ml-2 h-4 w-4  dark:text-bg-primary-light " />
              <Combobox.Input
                className=" w-full  rounded-md border-brandSozluk-800  py-2 pl-7  pr-10 text-sm leading-5 shadow-inner backdrop-blur-md focus:border-brandSozluk-700 focus:ring-0 dark:bg-bg-secondary-dark dark:placeholder-white "
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                placeholder="başlık,#entry,@yazar"
              />
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setInput("")}
            >
              <Combobox.Options
                className={
                  data.length > 0
                    ? " absolute  mt-1 max-h-60  w-full overflow-auto rounded-md bg-bg-primary-light py-1 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-bg-secondary-dark sm:text-sm"
                    : "hidden"
                }
              >
                {data.length === 0 && input !== "" && getData == null ? (
                  <div className=" relative cursor-default select-none px-4 py-2 dark:text-typography-body-strong-dark ">
                    Nothing found.
                  </div>
                ) : (
                  data.map((items) => (
                    <Combobox.Option
                      key={items.id}
                      className={({ active }) =>
                        `relative  cursor-pointer select-none   text-sm ${
                          active
                            ? "bg-button-light text-white  dark:text-typography-body-strong-dark  "
                            : " dark:text-typography-body-strong-dark "
                        }`
                      }
                      value={items}
                    >
                      {({ selected, active }) => (
                        <>
                          <button
                            id={items.id}
                            value={items.topicTitle}
                            onClick={(e: React.MouseEvent<HTMLElement>) =>
                              handleClick(e)
                            }
                            className={`block w-full truncate  py-2 pl-5 text-left pr-4${
                              selected ? "font-medium" : "font-normal "
                            }`}
                          >
                            {items.topicTitle}
                          </button>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active
                                  ? " dark:text-typography-body-strong-dark "
                                  : " dark:text-typography-body-strong-dark  "
                              }`}
                            ></span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
};

export default AutoSearch;
