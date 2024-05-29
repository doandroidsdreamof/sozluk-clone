import TextEditor from "./TextEditor";

interface RendererProps {
  topicTitle: string;
  entry?: string;
  entryId?: string;
  userId: string;
  output: string;
  showMore: number;
  edit: boolean;
  handleClose: () => void;
}

const Renderer = ({
  output,
  showMore,
  edit,
  handleClose,
  entryId,
  topicTitle,
  userId,
}: RendererProps) => {
  return (
    <>
      {!edit && typeof output === "string" ? (
        <div
          className="prose prose-sm m-2 break-words text-sm dark:text-typography-body-dark dark:prose-headings:text-white dark:prose-strong:text-white"
          dangerouslySetInnerHTML={{
            __html: output.length > 200 ? output.slice(0, showMore) : output,
          }}
        ></div>
      ) : (
        <TextEditor
          handleClose={() => handleClose()}
          entryId={entryId}
          userId={userId}
          entry={output}
          topicTitle={topicTitle}
        />
      )}
    </>
  );
};

export default Renderer;
