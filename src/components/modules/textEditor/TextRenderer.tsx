import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
// Option 1: Browser + server-side
import React, { useMemo } from "react";
import Code from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";

interface TextRendererProps {
  serializeString: string;
}

const TextRenderer = ({ serializeString }: TextRendererProps) => {
  const json = JSON.parse(serializeString) as string[];
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

  return (
    <div
      className="lg:prose-md prose prose-sm  m-2 block min-h-[10rem] w-full rounded-t-sm  border bg-white p-4  px-0 text-sm text-gray-800 sm:prose-base xl:prose-lg  dark:bg-dark-300  dark:text-typography-body-light"
      dangerouslySetInnerHTML={{ __html: output }}
    ></div>
  );
};

export default TextRenderer;
