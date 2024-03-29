import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import FilterForm from "../forms/FilterForm";
import { useSession } from "next-auth/react";

interface FilterModalProps {
  closeModal: () => void;
  isOpen: boolean;
}

export default function FilterModal({ isOpen, closeModal }: FilterModalProps) {
  const session = useSession();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[2000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-3 text-center md:p-4 md:px-2 lg:-translate-x-5 lg:px-0">
              <Transition.Child as={Fragment}>
                <Dialog.Panel
                  className={
                    session.data?.user
                      ? "min-h-fi  ounded-md relative top-14 flex w-nintyEight -translate-x-1 transform bg-white p-4 align-middle  shadow-xl dark:bg-bg-alt-dark md:top-10 lg:w-[38.5rem] lg:translate-x-0.5"
                      : "ounded-md  relative top-14   flex  min-h-fit w-nintyEight -translate-x-2 transform bg-white p-4 align-middle  shadow-xl dark:bg-bg-alt-dark md:top-10 lg:w-[39.5rem] lg:translate-x-2.5"
                  }
                >
                  <div className=" w-full pr-4 text-right">
                    <button className="inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <AiOutlineClose size={20} onClick={closeModal} />
                    </button>
                    <FilterForm />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
