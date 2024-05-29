import { useEffect } from "react";
import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import { setTheme } from "~/lib/store/reducers/themeSlice";

const DarkMode = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (theme) {
      const logicDark = theme.value === "dark" ? "dark" : "light";
      localStorage.theme = logicDark;
      document.documentElement.classList.remove(logicDark);
      document.documentElement.classList.add(
        logicDark === "light" ? "dark" : "light"
      );
    }
  }, [theme]);

  function handleTheme() {
    const next = theme.value === "dark" ? "light" : "dark";
    dispatch(setTheme(next));
  }
  const buttonStyle =
    "is-active p-2 border rounded dark:text-typography-body-strong-dark cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600";

  return (
    <>
      <button className={buttonStyle} onClick={handleTheme}>
        {theme && theme.value === "dark" ? (
          <FiMoon size={12} />
        ) : (
          <BsSun className="dark:text-white" size={12} />
        )}
      </button>
    </>
  );
};

export default DarkMode;
