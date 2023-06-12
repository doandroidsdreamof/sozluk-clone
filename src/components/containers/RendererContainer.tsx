import React from "react";
import { api } from "~/utils/api";
import { TextRenderer } from "../modules/index";

interface RendererContainerProps {
  topicTitle: string;
}

const RendererContainer = ({ topicTitle }: RendererContainerProps) => {
  const { data } = api.entry.getEntries.useQuery(topicTitle);

  return (
    <div>
      {data != null ? (
        data.map((items) => (
          <TextRenderer key={items.id} serializeString={items.content} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default RendererContainer;
