import React from "react";
import { api } from "~/utils/api";
import { TextRenderer } from "../modules/index";

interface RendererContainerProps {
  topicId: string;
}

const RendererContainer = ({ topicId }: RendererContainerProps) => {
  const { data } = api.entry.getEntries.useQuery(topicId);

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
