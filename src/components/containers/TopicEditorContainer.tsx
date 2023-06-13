import { useSession } from "next-auth/react";
import React, { type FC } from "react";

interface TopicEditorContainerProps {
  textEditor: React.ReactNode;
}

const TopicEditorContainer: FC<TopicEditorContainerProps> = (props) => {
  const session = useSession();
  console.log(
    "🚀 ~ file: TopicEditorContainer.tsx:10 ~ session:",
    session.data
  );

  return (
    <div>
      {session.data?.user ? (
        <div className="w-full lg:w-[42rem]">{props.textEditor}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopicEditorContainer;
