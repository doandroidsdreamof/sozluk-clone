import React from "react";

interface IEntryCardProps {
  outputLength: number;
  setShowMore: (param: number) => void;
  showMore: number;
  children: React.ReactNode;
}

const EntryCard = ({
  setShowMore,
  outputLength,
  showMore,
  children,
}: IEntryCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const input = e.target as HTMLElement;
    if (input.innerText === "show more") {
      setShowMore(outputLength);
    } else {
      setShowMore(250);
    }
  };
  return (
    <div className="mt-4 flex items-center justify-between pb-2   ">
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className={
          outputLength < 250
            ? "hidden"
            : " mr-auto flex min-w-fit   cursor-pointer rounded-md px-2.5 py-1.5 text-xs text-blue-600  hover:underline dark:text-brandGreen-600  "
        }
      >
        {showMore === 250 ? "show more" : "show less"}
      </button>
      <div className="flex w-full flex-row items-center justify-between ">
        {children}
      </div>
    </div>
  );
};

export default EntryCard;
