import { useSession } from "next-auth/react";
import React, { type FC } from "react";

interface TopicEditorContainerProps {
  children: React.ReactNode;
}

const TopicEditorContainer = ({ children }: TopicEditorContainerProps) => {
  const session = useSession();

  return (
    <>
      {session.data?.user ? (
        <div className="mt-auto w-full lg:w-[42rem]">{children}</div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopicEditorContainer;
