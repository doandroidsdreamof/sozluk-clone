import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { NotificationContainer } from "../containers/index";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, []);

  function closeModal(param: boolean) {
    if (param === true) {
      setIsOpen(false);
      router.push("/");
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="">
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative "
          onClose={() => {
            closeModal(false);
          }}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          ></Transition.Child>
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex   min-h-full items-center justify-center p-4 ">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex   w-full transform flex-col overflow-hidden rounded-md   border border-input-border-light bg-bg-secondary-light  align-middle   shadow-xl transition-all dark:border-input-border-dark dark:bg-bg-secondary-dark">
                  <button className="relative right-6 top-5 ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                    <AiOutlineClose
                      size={20}
                      onClick={() => {
                        closeModal(true);
                      }}
                    />
                  </button>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
            <NotificationContainer />
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
