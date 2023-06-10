import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import { navbarToggle } from "~/lib/store/reducers/toggleSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

interface HamburgerProps {
  breakPoint?: string;
  mobile?: string;
}

const Hamburger = ({ breakPoint, mobile }: HamburgerProps) => {
  const dispatch = useAppDispatch();
  const toggleState = useAppSelector((state) => state.toggle.navbarState);

  const handleClick = (): void => {
    dispatch(navbarToggle());
  };

  return (
    <>
      <button
        onClick={handleClick}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className={
          mobile === "md"
            ? ` }:hidden hidden items-center  rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-dark-100 dark:hover:bg-gray-500 md:inline-flex
        lg:hidden`
            : `inline-flex items-center  rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-dark-100 dark:hover:bg-gray-500 lg:hidden ${
                breakPoint || ""
              }:hidden`
        }
      >
        <span className="sr-only">Open sidebar</span>
        {toggleState ? (
          <AiOutlineClose size={20} />
        ) : (
          <RxHamburgerMenu size={20} />
        )}
      </button>
    </>
  );
};

export default Hamburger;
