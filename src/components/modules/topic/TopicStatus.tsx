interface ITopicStatusProps {
  statusText: string;
}

const TopicStatus = ({ statusText }: ITopicStatusProps) => {
  return (
    <>
      {statusText ? (
        <span className="mb-auto inline text-lg  leading-tight text-typography-body-secondary-dark dark:text-typography-body-secondary-dark lg:-translate-y-7 lg:text-xl">
          {statusText}
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopicStatus;
