import dynamic from "next/dynamic";
import React, { useState } from "react";
import { api } from "~/utils/api";
import TextRenderer from "../modules/textEditor/TextRenderer";
import { useRouter } from "next/router";

const Button = dynamic(() => import("~/components/modules/button/Button"), {
  ssr: false,
});

const EntriesContainer = () => {
  const router = useRouter();
  const { currentUser: userName } = router.query as {
    currentUser: string;
  };
  const { data } = api.entry.getUserEntries.useQuery({
    userName: userName,
  });
  const [showMore, setShowMore] = useState(5);
  const utils = api.useContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newValue = e.currentTarget.innerText;
    console.info(e.currentTarget);
    if (newValue === "show all" && data) {
      setShowMore(data.length);
    } else {
      setShowMore(5);
    }
  };

  return (
    <div className="">
      {data &&
        data
          .slice(0, showMore)
          .map((el) => <TextRenderer key={el.id} {...el} />)}
      {data ? (
        <div
          className={
            data.length > 5
              ? " flex w-full items-center  justify-center"
              : "hidden"
          }
        >
          <Button
            onClick={(e) => {
              handleClick(e);
            }}
            className="w-72 "
            size="tiny"
            type="primary"
          >
            {showMore == 5 ? "show all" : "show less"}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EntriesContainer;
