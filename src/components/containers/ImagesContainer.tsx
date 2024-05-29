import React from "react";
import { UI_MESSAGES } from "~/constants/staticContents";

interface ImagesContainerProps {
  children: React.ReactNode;
}

const ImagesContainer = () => {
  return <div className="text-white"> {UI_MESSAGES.EMPTY_CONTENT}</div>;
};

export default ImagesContainer;
