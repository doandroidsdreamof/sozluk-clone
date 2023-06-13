import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);

  function handlePos() {
    if (window.scrollY > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handlePos);
    return () => {
      window.removeEventListener("scroll", handlePos);
    };
  }, []);

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
          ? "fixed bottom-12 right-4 z-50  mx-auto flex items-center rounded-full bg-brandGreen-700  p-3 text-sm  text-white hover:bg-green-600"
          : "hidden"
      }
    >
      <AiOutlineArrowUp size={15} />
    </button>
  );
};

export default ScrollUpButton;
