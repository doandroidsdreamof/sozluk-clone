import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
// Option 1: Browser + server-side
import React, { useMemo, useState } from "react";
import Code from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";

interface TextRendererProps {
  serializeString: string;
}

const TextRenderer = ({ serializeString }: TextRendererProps) => {
  const json = JSON.parse(serializeString) as string[];
  const [showMore, setShowMore] = useState<number>(250);
  const output = useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Bold,
      Heading,
      Code,
      StarterKit,
    ]);
  }, [json]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const input = e.target as HTMLElement;
    if (input.innerText === "show more") {
      setShowMore(output.length);
    } else {
      setShowMore(250);
    }
  };

  return (
    <div className="lg:prose-md prose prose-sm  m-2 block min-h-[10rem] w-full rounded-t-sm  border bg-white p-4  px-0 text-sm text-gray-800 sm:prose-base xl:prose-lg  dark:bg-dark-300  dark:text-typography-body-light">
      {output.length < 250 && typeof output === "string" ? (
        <div dangerouslySetInnerHTML={{ __html: output }}></div>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: output.slice(0, showMore) }}
        ></div>
      )}
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className={
          output.length < 250
            ? "hidden"
            : "sbui-btn-primary dark ml-auto max-w-fit cursor-pointer rounded-sm  bg-brandGreen-800 px-2.5 py-1.5 text-xs text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900"
        }
      >
        {showMore === 250 ? "show more" : "show less"}
      </button>
    </div>
  );
};

export default TextRenderer;
