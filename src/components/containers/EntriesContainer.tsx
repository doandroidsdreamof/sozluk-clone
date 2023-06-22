import React, { useState } from "react";
import { api } from "~/utils/api";
import TextRenderer from "../modules/textEditor/TextRenderer";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("~/components/modules/button/Button"), {
  ssr: true,
});

interface EntriesContainerProps {
  children: React.ReactNode;
}

const EntriesContainer = () => {
  const { data } = api.entry.getUserEntries.useQuery();
  const [showMore, setShowMore] = useState(10);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newValue = e.currentTarget.innerText;
    console.info(e.currentTarget);
    if (newValue === "show all") {
      setShowMore(data?.length || 600);
    } else {
      setShowMore(10);
    }
  };

  return (
    <div className="">
      {data &&
        data
          .slice(0, showMore)
          .map((el) => <TextRenderer key={el.id.toString()} {...el} />)}
      {data ? (
        <div className=" flex items-center justify-center">
          <Button
            onClick={(e) => {
              handleClick(e);
            }}
            className="w-40"
            size="tiny"
            type="primary"
          >
            {showMore == 10 ? "show all" : "show less"}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EntriesContainer;
