import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
// Option 1: Browser + server-side
import React, { useMemo } from "react";

interface TextRendererProps {
  serializeString: string;
}

const TextRenderer = ({ serializeString }: TextRendererProps) => {
  const json = JSON.parse(serializeString) as unknown[];
  const output = useMemo(() => {
    return generateHTML(json, [Document, Paragraph, Text, Bold]);
  }, [json]);

  return (
    <pre>
      <code className="max-w-xl text-white">{output}</code>
    </pre>
  );
};

export default TextRenderer;
