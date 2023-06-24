import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";

// TODO: refactoring

interface TextEditorProps {
  topicTitle: string;
  entry?: string;
  entryId?: bigint;
  handleClose?: () => void;
  userId?: string;
}

const TextEditorMenu = dynamic(
  () => import("~/components/modules/textEditor/TextEditorMenu"),
  {
    ssr: false,
  }
);

const TextEditor = ({
  topicTitle,
  entry,
  entryId,
  userId,
  handleClose,
}: TextEditorProps) => {
  const { mutate: createTopicAndEntry } = api.topic.createTopic.useMutation();
  const { mutate: createEntry } = api.entry.createEntry.useMutation();
  const { mutate: updateEntry } = api.entry.updateEntry.useMutation();
  const { data: getData } = api.topic.getSingleTopic.useQuery(topicTitle);
  const { mutate: createFavorite } = api.favorite.ceateFavorite.useMutation();
  const utils = api.useContext();

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
  }) as Editor;

  const handlePost = () => {
    if (editor.getText().length > 0) {
      if (entry && handleClose && entryId && userId) {
        updateEntry(
          {
            entryId: BigInt(entryId),
            content: JSON.stringify(editor.getJSON()),
            userId: userId,
          },
          {
            onSuccess: (data) => {
              console.info("entry updated", data);
              void utils.entry.getUserEntries.invalidate();
              updateUI();
              handleClose();
            },
            onError: (error) => {
              console.error(error);
            },
          }
        );

        editor.commands.clearContent(true);
        return;
      }
      if (getData == null) {
        createTopicAndEntry(
          {
            topicTitle: topicTitle,
            entry: JSON.stringify(editor.getJSON()),
          },
          {
            onSuccess: () => {
              updateUI();
            },

            onError: (error) => {
              console.error(error);
            },
          }
        );
        editor.commands.clearContent(true);
        return;
      } else {
        createEntry(
          {
            topicId: BigInt(getData.id),
            content: JSON.stringify(editor.getJSON()),
          },
          {
            onSuccess: () => {
              updateUI();
              console.info("entry created");
            },
            onError: (error) => {
              console.error(error);
            },
          }
        );
        editor.commands.clearContent(true);
      }
    }
  };

  function updateUI() {
    void utils.topic.getSingleTopic.invalidate(topicTitle);
    void utils.topic.getAllTopics.invalidate();
    void utils.entry.getInfitineEntries.invalidate({});
  }

  return (
    <div className="mb-24 w-full border  border-gray-200 bg-gray-50   dark:border-input-border-dark dark:bg-dark-300 lg:w-[38rem]   ">
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
