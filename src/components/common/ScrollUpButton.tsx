import { useEffect, useState } from "react";

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
          ? "!fixed !bottom-3 !right-3 -z-50 !block !rounded-full  !bg-button-light !p-2.5 hover:!bg-blue-900"
          : "!hidden"
      }
    >

    </button>
  );
};

export default ScrollUpButton;