import { useEffect } from "react";
import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import { setTheme } from "~/lib/store/reducers/themeSlice";
import Button from "../modules/button/Button";

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

  return (
    <>
      <Button type="outline" onClick={handleTheme}>
        {theme.value === "dark" ? (
          <FiMoon size={15} />
        ) : (
          <BsSun className="dark:text-white" size={15} />
        )}
      </Button>
    </>
  );
};

export default DarkMode;
