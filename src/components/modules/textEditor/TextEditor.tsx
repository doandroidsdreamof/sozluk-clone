import Code from "@tiptap/extension-code";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AiOutlineBold,
  AiOutlineClear,
  AiOutlineCode,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
} from "react-icons/ai";
import { BsCodeSquare, BsTextParagraph } from "react-icons/bs";
import { MdHorizontalRule, MdRedo, MdUndo } from "react-icons/md";
import { RxListBullet, RxQuote } from "react-icons/rx";
import Button from "../button/Button";
import { useState } from "react";
import { api } from "~/utils/api";

type MenuProps = {
  editor: Editor;
  content: string;
  topicId: string;
  topicExist: boolean;
};

const MenuBar = ({ editor, content, topicId, topicExist }: MenuProps) => {
  const { mutate } = api.topic.createTopic.useMutation();
  const { mutate: createEntry } = api.entry.createEntry.useMutation();

  if (!editor) {
    return null;
  }

  const handlePost = () => {
    if (!topicExist) {
      mutate({
        topicTitle: topicId.replace(/\+/g, " "),
        entry: JSON.stringify(editor.getJSON()),
      });
    } else {
      createEntry({
        topicId: topicId,
        content: JSON.stringify(editor.getJSON()),
      });
    }
    editor.commands.clearContent(true);
    return;
  };

  const buttonStyle =
    "is-active p-2 text-gray-200  rounded dark:text-typography-body-strong-dark cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600";

  return (
    <div className="flex flex-wrap  items-center  border-t bg-editorHead   px-3 py-2 dark:border-gray-600 dark:bg-bg-alt-dark">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <AiOutlineBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <AiOutlineStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <AiOutlineCode />
      </button>
      <button
        className={`${buttonStyle}`}
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        <AiOutlineClear />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <BsTextParagraph />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <RxListBullet />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <AiOutlineOrderedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <BsCodeSquare />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? `is-active ${buttonStyle}`
            : `${buttonStyle}`
        }
      >
        <RxQuote />
      </button>
      <button
        className={`${buttonStyle}`}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MdHorizontalRule />
      </button>
      <button
        className={`${buttonStyle}`}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <MdUndo />
      </button>
      <button
        className={`${buttonStyle}`}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <MdRedo />
      </button>
      <Button
        disabled={content.length == 0 ? true : false}
        onClick={() => handlePost()}
        className="ml-auto max-w-fit "
        block={true}
        size="tiny"
        type="primary"
      >
        comment
      </Button>
    </div>
  );
};

interface TextEditorProps {
  topicId: string;
  topicExist: boolean;
}
const TextEditor = ({ topicId, topicExist }: TextEditorProps) => {
  const [content, setContent] = useState("");
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

  return (
    <div className="mb-24 w-full  border border-gray-200   bg-gray-50 dark:border-input-border-dark dark:bg-dark-300   ">
      <EditorContent editor={editor} />
      <MenuBar
        topicExist={topicExist}
        topicId={topicId}
        content={content}
        editor={editor}
      />
    </div>
  );
};

export default TextEditor;