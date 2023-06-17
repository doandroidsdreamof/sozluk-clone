import React, { useEffect, useState } from "react";
import { TopicHeader, TextEditor } from "../modules/index";
import { TopicEditorContainer, RendererContainer } from "../containers/index";
import { Paginate } from "../common/index";

interface TopicLayoutProps {
  topicTitle: string;
  topicUid: string | null;
  isLoading: boolean;
}

const TopicLayout = ({ topicTitle, topicUid, isLoading }: TopicLayoutProps) => {
  if (isLoading) {
    return <></>;
  }
  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full flex-col justify-between gap-4  p-3  text-left  lg:w-[38rem]    lg:-translate-x-3 lg:pl-0">
      <TopicHeader headerOne={topicTitle} />
      {!topicUid ? (
        <span className="mb-auto inline text-lg  leading-tight text-typography-body-secondary-dark dark:text-typography-body-secondary-dark lg:-translate-y-7  lg:text-xl">
          {"There is nothing here"}
        </span>
      ) : (
        <></>
      )}
      <>
        <RendererContainer topicTitle={topicTitle} />
      </>
      <TopicEditorContainer
        textEditor={<TextEditor topicTitle={topicTitle} />}
      />
    </div>
  );
};

export default TopicLayout;
