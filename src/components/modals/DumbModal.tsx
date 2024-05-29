import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import NotificationContainer from "../containers/NotificationContainer";

interface DumbModalProps {
  children: React.ReactNode;
  dumbOpen: boolean;
  closeDumbOpen: (param: boolean) => void;
}

function DumbModal({ children, dumbOpen, closeDumbOpen }: DumbModalProps) {
  //TODO refactoring open-closed principle

  function closeModal(param: boolean) {
    closeDumbOpen(false);
  }

  return (
    <div>
      <Transition appear show={dumbOpen}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            closeModal(false);
          }}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child>
                <Dialog.Panel className="flex w-full flex-col overflow-hidden rounded-md border border-input-border-light bg-bg-secondary-light align-middle shadow-xl dark:border-input-border-dark dark:bg-bg-secondary-dark">
                  <button className="bright-6 relative top-5 ml-auto mr-3 inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
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

export default DumbModal;
