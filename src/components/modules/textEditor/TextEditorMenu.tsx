import { type Editor } from "@tiptap/react";
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

interface IMenuProps {
  editor: Editor;
  handleFunc: () => void;
  buttonText: string;
}

const buttonStyle =
  "is-active p-2 text-gray-200 rounded dark:text-typography-body-strong-dark cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600";

//TODO refactoring open-closed
const TextEditorMenu = ({ editor, handleFunc, buttonText }: IMenuProps) => {
  if (!editor) {
    return null;
  }

  const handleClick = () => {
    handleFunc();
  };

  return (
    <div className="flex flex-wrap items-center border-t bg-editorHead px-3 py-2 dark:border-gray-600 dark:bg-bg-alt-dark">
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
      <button
        onClick={() => handleClick()}
        disabled={editor.getText().length === 0 ? true : false}
        className="sbui-btn-primary dark ml-auto mt-3 max-w-fit cursor-pointer rounded-sm  bg-brandGreen-800 px-2.5 py-1.5 text-xs text-white hover:bg-brandGreen-600 dark:hover:bg-brandGreen-900"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TextEditorMenu;
