import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { api } from "~/utils/api";

import TextEditorMenu from "./TextEditorMenu";

interface TextEditorProps {
  topicTitle: string;
}
const TextEditor = ({ topicTitle }: TextEditorProps) => {
  const { mutate } = api.topic.createTopic.useMutation();
  const { mutate: createEntry } = api.entry.createEntry.useMutation();
  const { refetch } = api.entry.getEntries.useQuery(topicTitle);
  const [content, setContent] = useState("");
  const { data: getData, isLoading } =
    api.topic.getSingleTopic.useQuery(topicTitle);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    editorProps: {
      attributes: {
        class:
          "richText prose prose-sm sm:prose-base lg:prose-md xl:prose-lg  block w-full px-0  min-h-[10rem] rounded-t-sm dark:bg-bg-alt-dark text-sm text-gray-800 bg-white border-0 dark:bg-dark-300  dark:text-typography-body-light",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getText());
    },
  }) as Editor;

  const handlePost = () => {
    console.info("🚀 ~ file: TextEditor.tsx:36 ~ handlePost ~ e:");
    if (editor.getText().length > 0) {
      if (getData == null) {
        const newEntryAndTopic = {
          topicTitle: topicTitle,
          entry: JSON.stringify(editor.getJSON()),
        };
        mutate(newEntryAndTopic, {
          onSuccess: () => {
            refetch()
              .then((get) => console.info("refetch =====>", get))
              .catch((err) => console.error(err));
          },
          onError: (error) => {
            console.error(error);
          },
        });
        editor.commands.clearContent(true);
      } else {
        const newEntry = {
          topicId: getData.id,
          content: JSON.stringify(editor.getJSON()),
        };
        createEntry(newEntry, {
          onSuccess: () => {
            refetch()
              .then((get) => console.info("refetch =====>", get))
              .catch((err) => console.error(err));
          },
          onError: (error) => {
            console.error(error);
          },
        });
        editor.commands.clearContent(true);
        return;
      }
    }
  };

  return (
    <div className="mb-24 w-full  border border-gray-200   bg-gray-50 dark:border-input-border-dark dark:bg-dark-300   ">
      <EditorContent editor={editor} />
      <TextEditorMenu editor={editor} handleFunc={() => handlePost()} />
    </div>
  );
};

export default TextEditor;
