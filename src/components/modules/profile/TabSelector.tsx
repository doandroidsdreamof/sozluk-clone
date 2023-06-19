import React from "react";
import {
  FavoritesContainer,
  EntriesContainer,
  ImagesContainer,
} from "~/components/containers";

interface EL {
  [key: number]: JSX.Element;
}

interface TabSelectorProps {
  status: number;
}

function TabSelector({ status }: TabSelectorProps) {
  const SELECT_ELEMENTS: EL = {
    0: <EntriesContainer />,
    1: <FavoritesContainer />,
    2: <ImagesContainer />,
  };

  return (
    <div>{status <= 2 && status >= 0 ? SELECT_ELEMENTS[status] : null}</div>
  );
}

export default TabSelector;
