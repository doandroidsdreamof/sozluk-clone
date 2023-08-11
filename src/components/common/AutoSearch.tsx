import { Combobox, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import { api } from "~/utils/api";
import FilterModal from "../modals/FilterModal";
import { useSession } from "next-auth/react";

interface SearchOptions {
  id: string;
  topicTitle: string;
}

const AutoSearch = () => {
  const router = useRouter();
  const [data, setData] = useState<SearchOptions[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: getData, status } = api.topic.filterTopic.useQuery(input);
  const session = useSession();

  useEffect(() => {
    if (getData != null && status === "success") {
      setData(getData.findTopics);
    }
  }, [status, input]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.target != null) {
      const { value, id }: { value: string | null; id: string | null } =
        e.target as HTMLInputElement;
      if (typeof value === "string" && typeof id === "string") {
        setData([]);
        void router.push(
          `/topic/${encodeURIComponent(value.replace(/\s/g, ""))}`
        );
      }
    }
  };

  const filteredTopics = useCallback(() => {
    input === ""
      ? data
      : data.filter((items) => {
          return items.topicTitle.toLowerCase().includes(input.toLowerCase());
        });
  }, [data]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // TODO keyboard navigation

  const handleNavigation = (e: React.KeyboardEvent<HTMLElement>) => {
    void router.push(`/topic/${encodeURIComponent(input.replace(/\s/g, " "))}`);
    setInput("");
  };

  return (
    <>
      <div
        className={
          session.data?.user
            ? "mx-auto w-full lg:w-[38.5rem]  lg:translate-x-5"
            : "mx-auto w-full lg:w-[39.5rem]  lg:translate-x-4"
        }
      >
        <Combobox value={data} onChange={filteredTopics}>
          <div className="relative mt-1">
            <div className="relative flex w-full flex-wrap items-stretch">
              <Combobox.Input
                onKeyUp={(e) => {
                  if (e.key === "Enter" && input.length > 0) {
                    handleNavigation(e);
                  }
                }}
                className="focus:border-primary dark:focus:border-primary relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-r-0 border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out placeholder:text-xs focus:z-[3] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                placeholder="topic,#entry,@author"
              />
              <button
                onClick={() => openModal()}
                className=" top-1 z-[2] inline-block items-center  border-b border-t  border-solid border-neutral-300 bg-transparent px-2  text-xs font-medium uppercase dark:border-neutral-600 "
              >
                {isOpen ? (
                  <BsFillCaretUpFill className="  z-40  h-3 w-4  dark:text-bg-primary-light " />
                ) : (
                  <BsFillCaretDownFill className="  z-40  h-3 w-4  dark:text-bg-primary-light " />
                )}
              </button>
              <button className="bg-primary relative   z-[2] flex items-center rounded-r bg-brandGreen-900 px-6 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md hover:bg-brandGreen-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
                <HiOutlineSearch className="  z-40  h-3 w-4  dark:text-bg-primary-light " />
              </button>
            </div>
            <FilterModal isOpen={isOpen} closeModal={() => closeModal()} />
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
                    ? " absolute z-50  mt-1 max-h-60  w-full overflow-auto rounded-md bg-bg-primary-light py-1 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-bg-secondary-dark sm:text-sm"
                    : "hidden"
                }
              >
                {data.length == 0 && getData == null ? (
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
                            ? "bg-button-light bg-brandGreen-800  text-white dark:text-typography-body-strong-dark "
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
                                  ? " dark:text-typography-body-strong-dark"
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
