import { BUTTON_TEXT } from "@/constants/staticContents";
import { useState, type FC } from "react";

interface IShowMoreProps {
  text: string;
}

const ShowMore: FC<IShowMoreProps> = ({ text }: IShowMoreProps) => {
  const [expand, setExpand] = useState(false);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <p className="dark:text-dark-text-second mb-2 text-sm">
      {text.length > 200 ? (
        <>
          {expand ? (
            <span className="mr-2">{text}</span>
          ) : (
            <span className="mr-1 inline">{text.substring(0, 250)}</span>
          )}
          <button onClick={handleClick} className="text-show-more">
            {expand ? BUTTON_TEXT.SHOW_LESS : BUTTON_TEXT.SHOW_MORE}
          </button>
        </>
      ) : (
        <>{text}</>
      )}
    </p>
  );
};

export default ShowMore;
