import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { api } from "~/utils/api";

import TextEditorMenu from "./TextEditorMenu";

// TODO: refactoring

interface TextEditorProps {
  topicTitle: string;
  entry?: string;
  entryId?: string;
  handleClose?: () => void;
}
const TextEditor = ({
  topicTitle,
  entry,
  entryId,
  handleClose,
}: TextEditorProps) => {
  const { mutate } = api.topic.createTopic.useMutation();
  const { mutate: createEntry } = api.entry.createEntry.useMutation();
  const { refetch: refetchEntry } = api.entry.getEntries.useQuery(topicTitle);
  const [content, setContent] = useState("");
  const { refetch: refetchGetAllTopics } = api.topic.getAllTopics.useQuery();
  const { mutate: updateEntry } = api.entry.updateEntry.useMutation();
  const utils = api.useContext();

  const {
    refetch: refetchTopic,
    data: getData,
    isLoading,
  } = api.topic.getSingleTopic.useQuery(topicTitle);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    editorProps: {
      attributes: {
        class:
          "richText prose prose-sm sm:prose-base  lg:prose-md xl:prose-lg  block min-w-full px-0  min-h-[10rem] rounded-t-sm dark:bg-bg-alt-dark text-sm text-gray-800  bg-gray-50 border-0 dark:bg-dark-300  dark:text-typography-body-light",
      },
    },
    onCreate({ editor }) {
      if (entry) {
        editor.commands.setContent(entry);
      }
    },

    onUpdate({ editor }) {
      setContent(editor.getText());
    },
  }) as Editor;

  const handlePost = () => {
    if (editor.getText().length > 0) {
      if (entry && handleClose && entryId) {
        const newEntryUpdate = {
          entryId: entryId,
          content: JSON.stringify(editor.getJSON()),
        };
        updateEntry(newEntryUpdate, {
          onSuccess: (data) => {
            console.info("entry updated", data);
            utils.entry.getEntries
              .invalidate(topicTitle)
              .catch((err) => console.log(err));
            handleClose();
          },
          onError: (error) => {
            console.error(error);
          },
        });

        editor.commands.clearContent(true);
        return;
      }
      if (getData == null) {
        const newEntryAndTopic = {
          topicTitle: topicTitle,
          entry: JSON.stringify(editor.getJSON()),
        };
        mutate(newEntryAndTopic, {
          onSuccess: () => {
            console.info("topic & entry created");
            updateUI();
          },

          onError: (error) => {
            console.error(error);
          },
        });
        editor.commands.clearContent(true);
        return;
      } else {
        const newEntry = {
          topicId: getData.id,
          content: JSON.stringify(editor.getJSON()),
        };
        createEntry(newEntry, {
          onSuccess: () => {
            console.info("entry created");
            updateUI();
          },
          onError: (error) => {
            console.error(error);
          },
        });
        editor.commands.clearContent(true);
      }
    }
  };
  function updateUI() {
    refetchEntry().catch((err) => console.error(err));
    refetchTopic().catch((err) => console.error(err));
    refetchGetAllTopics().catch((err) => console.error(err));
  }

  return (
    <div className="mb-24 w-full  border border-gray-200   bg-gray-50 dark:border-input-border-dark dark:bg-dark-300   ">
      <EditorContent editor={editor} />
      <TextEditorMenu
        buttonText={entry ? "edit" : "comment"}
        editor={editor}
        handleFunc={() => {
          handlePost();
        }}
      />
    </div>
  );
};

export default TextEditor;
