import React from "react";
import EntriesContainer from "@/components/containers/EntriesContainer";
import FavoritesContainer from "@/components/containers/FavoritesContainer";
import ImagesContainer from "@/components/containers/ImagesContainer";

interface EL {
  [key: number]: JSX.Element;
}

interface TabSelectorProps {
  status: number;
  profilePage: boolean;
}

function TabSelector({ status, profilePage }: TabSelectorProps) {
  const SELECT_ELEMENTS: EL = {
    0: <EntriesContainer />,
    1: <FavoritesContainer />,
    2: <ImagesContainer />,
  };

  return (
    <>
      {profilePage ? (
        <div>{status <= 2 && status >= 0 ? SELECT_ELEMENTS[status] : null}</div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TabSelector;
