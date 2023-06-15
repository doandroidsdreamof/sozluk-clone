import React, { useEffect } from "react";
import { TopicHeader, TextEditor, TextRenderer } from "../modules/index";
import { TopicEditorContainer, RendererContainer } from "../containers/index";
import Link from "next/link";
import router from "next/router";

interface FeedLayoutProps {
  user: {
    name: string;
    id: string;
    avatar: string | null;
  };
  topic: {
    topicTitle: string;
    id: string;
  };
  content: string;
  id: string;
  createdAt: Date;
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
                  onClick={() => handleClick(items.topic.topicTitle)}
                  className="h-full w-full cursor-pointer text-left"
                >
                  <TopicHeader
                    key={items.topic.id}
                    headerOne={items.topic.topicTitle}
                  />
                </button>
                <TextRenderer {...items} />
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
