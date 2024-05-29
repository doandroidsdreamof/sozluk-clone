import dynamic from "next/dynamic";
import React, { useState } from "react";
import { api } from "~/utils/api";
import TextRenderer from "../modules/textEditor/TextRenderer";
import { useRouter } from "next/router";
import { UI_MESSAGES } from "~/constants/staticContents";

const Button = dynamic(() => import("~/components/modules/button/Button"), {
  ssr: false,
});

// TODO refactor with entries containers
// TODO hard-coded strings && magic numbers

const FavoritesContainer = () => {
  const router = useRouter();
  const { currentUser: userName } = router.query as {
    currentUser: string;
  };
  const { data, isLoading } = api.favorite.getFavorites.useQuery({
    userName: userName,
  });
  const [showMore, setShowMore] = useState(5);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newValue = e.currentTarget.innerText;
    if (newValue === "show all" && data) {
      setShowMore(data.length);
    } else {
      setShowMore(5);
    }
  };
  if (isLoading) {
    return (
      <p className="text-typography-body-light dark:text-typography-body-dark">
        {UI_MESSAGES.LOADING}
      </p>
    );
  }
  return (
    <div className="">
      {data &&
        data
          .slice(0, showMore)
          .map((el) => <TextRenderer key={el.id} {...el} />)}
      {data && data.length > 0 ? (
        <div
          className={
            data.length > 10 ? " flex items-center justify-center" : "hidden"
          }
        >
          <Button
            onClick={(e) => {
              handleClick(e);
            }}
            className="w-40"
            size="tiny"
            type="primary"
          >
            {showMore == 5 ? "show all" : "show less"}
          </Button>
        </div>
      ) : (
        <p className="text-typography-body-light dark:text-typography-body-dark">
          {UI_MESSAGES.EMPTY_CONTENT}
        </p>
      )}
    </div>
  );
};

export default FavoritesContainer;
2;
