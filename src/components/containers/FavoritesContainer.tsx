import dynamic from "next/dynamic";
import React, { useState } from "react";
import { api } from "~/utils/api";
import TextRenderer from "../modules/textEditor/TextRenderer";

const Button = dynamic(() => import("~/components/modules/button/Button"), {
  ssr: false,
});

// TODO refactor with entries containers

const FavoritesContainer = () => {
  const { data } = api.entry.getFavorites.useQuery();
  console.info(
    "🚀 ~ file: FavoritesContainer.tsx:16 ~ FavoritesContainer ~ data:",
    data
  );
  const [showMore, setShowMore] = useState(10);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newValue = e.currentTarget.innerText;
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
          .map((el) => <TextRenderer key={el.id} {...el} />)}
      {data && data.length > 0 ? (
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
        <p className="text-typography-body-light dark:text-typography-body-dark">
          there is empty
        </p>
      )}
    </div>
  );
};

export default FavoritesContainer;
2;
