import { useAppSelector } from "~/lib/store/hooks";
import { IoIosSettings } from "react-icons/io";

const Aside = () => {
  const toggleState = useAppSelector((state) => state.toggle.navbarState);

  return (
    <aside>
      <div
        className={
          toggleState
            ? "fixed  left-0 z-0   flex max-h-screen min-h-screen  w-fit  bg-bg-primary-light  transition-transform  dark:bg-bg-primary-dark"
            : "fixed  left-0 z-0  flex  max-h-screen min-h-screen  w-fit  -translate-x-full  bg-bg-primary-light   transition-transform dark:bg-bg-primary-dark lg:translate-x-0"
        }
      >
        <div className="flex w-64 flex-col  overflow-y-auto border-r border-input-border-dark bg-bg-primary-light dark:bg-bg-primary-dark">
          <div className="flex   h-16  items-center  px-4 pt-2 text-left">
            <span className="px-4 text-lg font-semibold  text-gray-800 dark:text-white">
              Gündem
            </span>
            <IoIosSettings className="-translate-x-2 cursor-pointer  text-gray-800 dark:text-white" />
          </div>
          <nav className="flex flex-1 flex-col space-y-1 px-4 py-2">
            <button className="rounded-md  px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-bg-alt-dark ">
              Lorem Ipsum
            </button>
            <button className="rounded-md  px-4   py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-bg-alt-dark">
              Lorem Ipsum
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300 dark:hover:bg-bg-alt-dark">
              Short
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Medium Length
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              This is a Longer Button Text
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              A Button with Even Longer Text Content
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Short
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              A Bit Longer
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              A Button with Lengthy Text Content
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Short
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Medium Text
            </button>
            <button className="truncate rounded-md px-4   py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              A Button with Considerable Length of Content,A Button with
              Considerable Length of Content,A Button with Considerable Length
              of Content,A Button with Considerable Length of Content,A Button
              with Considerable Length of Content
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Short
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Medium Text
            </button>
            <button className="truncate rounded-md px-4   py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              A Button with Considerable Length of Content,A Button with
              Considerable Length of Content,A Button with Considerable Length
              of Content,A Button with Considerable Length of Content,A Button
              with Considerable Length of Content
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Medium Text
            </button>
            <button className="truncate rounded-md px-4   py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              A Button with Considerable Length of Content,A Button with
              Considerable Length of Content,A Button with Considerable Length
              of Content,A Button with Considerable Length of Content,A Button
              with Considerable Length of Content
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Short
            </button>
            <button className="truncate rounded-md px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              Medium Text
            </button>
            <button className="truncate rounded-md px-4   py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none dark:text-gray-300  dark:hover:bg-bg-alt-dark">
              A Button with Considerable Length of Content,A Button with
              Considerable Length of Content,A Button with Considerable Length
              of Content,A Button with Considerable Length of Content,A Button
              with Considerable Length of Content
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
