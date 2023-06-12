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

interface TextRendererProps {
  serializeString: string;
}

const TextRenderer = ({ serializeString }: TextRendererProps) => {
  const json = JSON.parse(serializeString) as string[];
  const output = useMemo(() => {
    return generateHTML(json, [Document, Paragraph, Text, Bold, Heading, Code]);
  }, [json]);

  return (
    <div
      className="m-2 border p-4 dark:text-white"
      dangerouslySetInnerHTML={{ __html: output }}
    ></div>
  );
};

export default TextRenderer;
