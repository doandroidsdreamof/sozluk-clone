import React, { useEffect } from "react";
import { TopicHeader, TextEditor, RendererFeed } from "../modules/index";
import { TopicEditorContainer, RendererContainer } from "../containers/index";
import Link from "next/link";
import router from "next/router";

interface Entry {
  content: string;
  id: string;
  createdAt: Date;
}

interface FeedLayoutProps {
  user: {
    name: string;
    id: string;
    avatar: string | null;
  };
  entry: Entry[];
  topicTitle: string;
  id: string;
}
interface FeedProps {
  data: FeedLayoutProps[];
}

const FeedLayout = (data: FeedProps) => {
  if (!data) {
    return <></>;
  }

  const handleClick = (url: string) => {
    void router.push(`/topic/${encodeURIComponent(url.replace(/ /g, "+"))}`);
  };

  return (
    <div className=" top-0 mx-auto flex min-h-screen w-full flex-col justify-between gap-4  p-3  lg:w-[38rem]    lg:-translate-x-3 lg:pl-0">
      <div className="">
        <div>
          {data != null ? (
            data.data.map((items) => (
              <div key={items.id}>
                <button
                  onClick={() => handleClick(items.topicTitle)}
                  className="h-full w-full cursor-pointer text-left text-typography-body-secondary-light underline dark:text-typography-body-dark"
                >
                  <TopicHeader key={items.id} headerOne={items.topicTitle} />
                </button>
                <RendererFeed {...items} />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
