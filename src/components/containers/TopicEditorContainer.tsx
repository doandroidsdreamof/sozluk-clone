import { useSession } from "next-auth/react";
import React, { type FC } from "react";

interface TopicEditorContainerProps {
  textEditor: React.ReactNode;
}

const TopicEditorContainer: FC<TopicEditorContainerProps> = (props) => {
  const session = useSession();

  return (
    <>
      {session.data?.user ? (
        <div className="mt-auto w-full lg:w-[42rem]">{props.textEditor}</div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopicEditorContainer;
