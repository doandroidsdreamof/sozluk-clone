import { Combobox, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  chatInterfaceClose,
  setReceiverName,
  chatBoxToggle,
} from "@/lib/store/reducers/messageSlice";
import { api } from "@/utils/api";

interface SearchOptions {
  id: string;
  name: string;
}

// TODO abstract auto search component logic && style

function ChatSearch() {
  const session = useSession();
  const [data, setData] = useState<SearchOptions[]>([]);
  const [input, setInput] = useState<string>("");
  const { data: getData, status } = api.user.filterUser.useQuery(input, {
    enabled: session?.data?.user ? true : false,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getData != null && status === "success") {
      setData(getData.result);
    }
  }, [status, input]);

  const filteredUsers = useCallback(() => {
    input === ""
      ? data
      : data.filter((items) => {
          return items.name.toLowerCase().includes(input.toLowerCase());
        });
  }, [data]);

  const handleNavigation = (e: React.KeyboardEvent<HTMLElement>) => {
    setInput("");
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.target != null) {
      const { value, id }: { value: string | null; id: string | null } =
        e.target as HTMLInputElement;
      if (typeof value === "string" && typeof id === "string") {
        setData([]);
        dispatch(setReceiverName(value));
        dispatch(chatInterfaceClose());
        dispatch(chatBoxToggle());
      }
    }
  };

  return (
    <Combobox value={data} onChange={filteredUsers}>
      <div className="order relative z-50 mb-2 mt-1 w-full ">
        <div className="relative w-full cursor-default overflow-hidden rounded-md border-none text-left shadow-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none pl-6 text-xs"
            onChange={(event) => {
              setInput(event.target.value || "");
            }}
            placeholder="search people to chat"
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
                ? " absolute z-50  mt-1 max-h-60  w-full  overflow-auto rounded-md bg-bg-primary-light py-1 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                : "hidden"
            }
          >
            {data.length == 0 && getData == null ? (
              <div className="relative cursor-default select-none bg-bg-primary-light px-4 py-2  text-gray-700">
                Nothing found.
              </div>
            ) : (
              data.map((items) => (
                <Combobox.Option
                  key={items.id}
                  className={({ active }) =>
                    `relative  cursor-pointer select-none text-sm ${
                      active
                        ? "bg-button-light bg-brandGreen-800  text-typography-body-dark"
                        : "text-typography-body-light "
                    }`
                  }
                  value={items}
                >
                  {({ selected, active }) => (
                    <>
                      <button
                        id={items.id}
                        value={items.name}
                        onClick={(e: React.MouseEvent<HTMLElement>) =>
                          handleClick(e)
                        }
                        className={`block w-full truncate  py-2 pl-5 text-left pr-4${
                          selected ? "font-medium" : "font-normal "
                        }`}
                      >
                        {items.name}
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
  );
}

export default ChatSearch;
