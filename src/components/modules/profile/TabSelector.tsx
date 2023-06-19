import React from "react";
import {
  FavoritesContainer,
  EntriesContainer,
  ImagesContainer,
} from "~/components/containers";

type Status = "0" | "1" | "2";

interface TabSelectorProps {
  status: Status;
}

function TabSelector({ status }: TabSelectorProps) {
  const SELECT_ELEMENTS = {
    "0": <EntriesContainer />,
    "1": <FavoritesContainer />,
    "2": <ImagesContainer />,
  };

  return <div>{SELECT_ELEMENTS[status]}</div>;
}

export default TabSelector;
