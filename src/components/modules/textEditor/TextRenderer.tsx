// Option 2: Browser-only (lightweight)
import { generateHTML } from "@tiptap/html";
// Option 1: Browser + server-side
import StarterKit from "@tiptap/starter-kit";
import React, { useMemo, useState } from "react";
import { ProfileCard, EntryCard } from "../index";

interface TextRendererProps {
  serializeString: string;
}

const TextRenderer = ({ serializeString }: TextRendererProps) => {
  const json = JSON.parse(serializeString) as string[];
  const [showMore, setShowMore] = useState<number>(250);
  const output = useMemo(() => {
    return generateHTML(json, [StarterKit]);
  }, [json]);

  return (
    <div className="my-4 flex min-h-[10rem] max-w-4xl flex-col justify-between rounded-sm bg-white p-3  text-sm shadow-sm dark:bg-bg-alt-dark   lg:w-[42rem]  ">
      <div className="mt-2">
        {typeof output === "string" ? (
          <div
            className="prose prose-sm m-2 break-words text-sm dark:text-typography-body-dark dark:prose-headings:text-white dark:prose-strong:text-white "
            dangerouslySetInnerHTML={{
              __html: output.length > 200 ? output.slice(0, showMore) : output,
            }}
          ></div>
        ) : (
          <></>
        )}
      </div>
      <EntryCard
        setShowMore={setShowMore}
        showMore={showMore}
        outputLength={output.length}
      />
    </div>
  );
};

export default TextRenderer;

/*

 text-blue-600 hover:underline

    <div className=" prose prose-sm m-2  min-h-[10rem]  w-full rounded-t-sm border  bg-white p-3 text-sm   text-gray-800 sm:prose-base xl:prose-lg  dark:bg-dark-300  dark:text-typography-body-light">
      {typeof output === "string" && output.length < 250 ? (
        <div
          className="break-words text-sm"
          dangerouslySetInnerHTML={{ __html: output }}
        ></div>
      ) : (
        <div
          className="break-words text-sm"
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
            : "sbui-btn-primary dark ml-auto   flex max-w-fit cursor-pointer rounded-md px-2.5  py-1.5 text-xs text-typography-body-light hover:bg-brandGreen-600 hover:text-white dark:text-white dark:hover:bg-brandGreen-900"
        }
      >
        {showMore === 250 ? "show more" : "show less"}
      </button>




    </div>






      <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
            <span className="font-light text-gray-600">mar 10, 2019</span>
            <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">Design</a>
        </div>
        <div className="mt-2">
            <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="#">Accessibility tools for designers and developers</a>
            <p className="mt-2 text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
        </div>
        <div className="flex justify-between items-center mt-4">
            <a className="text-blue-600 hover:underline" href="#">Read more</a>
            <div>
                <a className="flex items-center" href="#">
                    <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar" />
                    <h1 className="text-gray-700 font-bold">Khatab wedaa</h1>
                </a>
            </div>
        </div>
    </div>



*/
