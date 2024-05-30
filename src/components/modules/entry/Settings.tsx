import { Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ISettingsProps {
  userId: string;
  handleEdit: () => void;
  handleRemoveEntry: () => void;
}
//TODO hard-coded buttons
const Settings = ({
  userId,
  handleEdit,
  handleRemoveEntry,
}: ISettingsProps) => {
  const session = useSession();

  return (
    <>
      {session.data?.user.id === userId ? (
        <div className="z-30">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="is-active right-0 flex  cursor-pointer rounded  p-2 text-typography-body-light hover:bg-gray-100 hover:text-gray-900  dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white">
                <BsThreeDotsVertical />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute  right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleEdit}
                        className={`${
                          active
                            ? "bg-brandGreen-800 text-white"
                            : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleRemoveEntry}
                        className={`${
                          active
                            ? "bg-brandGreen-800 text-white"
                            : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Settings;
