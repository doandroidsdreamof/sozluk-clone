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
          <button onClick={handleClick} className=" text-show-more">
            show {expand ? "less" : "more"}
          </button>
        </>
      ) : (
        <>{text}</>
      )}
    </p>
  );
};

export default ShowMore;
