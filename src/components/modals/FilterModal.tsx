import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import FilterForm from "../forms/FilterForm";
import { useSession } from "next-auth/react";

interface IFilterModalProps {
  closeModal: () => void;
  isOpen: boolean;
}

export default function FilterModal({ isOpen, closeModal }: IFilterModalProps) {
  const session = useSession();

  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-[2000]" onClose={closeModal}>
          <Transition.Child>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={
                session.data?.user
                  ? "min-h-full items-start justify-center p-3 pr-7 text-center md:p-4 md:px-2 md:pr-7 lg:flex lg:-translate-x-6 lg:px-0 lg:pr-0"
                  : "min-h-full items-start justify-center p-3 px-5 text-center md:p-4 md:px-5 lg:flex lg:-translate-x-4 lg:px-0"
              }
            >
              <Transition.Child>
                <Dialog.Panel
                  className={
                    session.data?.user
                      ? "relative top-14 flex min-h-fit rounded-sm bg-white p-2 align-middle shadow-xl dark:bg-bg-alt-dark md:top-10 lg:w-[38.5rem] lg:translate-x-1"
                      : "relative top-14 flex min-h-fit -translate-x-2 transform rounded-sm bg-white p-2 align-middle shadow-xl dark:bg-bg-alt-dark md:top-10 lg:w-[39.5rem] lg:translate-x-2.5"
                  }
                >
                  <div className="w-full px-2 text-right">
                    <button
                      onClick={closeModal}
                      className="inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <AiOutlineClose size={20} />
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
