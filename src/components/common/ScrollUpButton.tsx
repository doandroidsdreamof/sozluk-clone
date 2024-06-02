import { AiOutlineArrowUp } from "react-icons/ai";
import useScrollVisibility from "@/hooks/useScrollVisibility";

const ScrollUpButton = () => {
  const visible = useScrollVisibility(50);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={
        visible
          ? "fixed bottom-12 left-3 z-50 mx-auto flex items-center rounded-full bg-brandGreen-700 p-3 text-sm text-white hover:bg-green-600 md:bottom-24 lg:bottom-12 lg:left-auto lg:right-3"
          : "hidden"
      }
    >
      <AiOutlineArrowUp size={15} />
    </button>
  );
};

export default ScrollUpButton;
