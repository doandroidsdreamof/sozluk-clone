import React, { useEffect } from "react";
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
        data.map((items) => <TextRenderer {...items} key={items.id} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default RendererContainer;
