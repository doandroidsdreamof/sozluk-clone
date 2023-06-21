import Avatar from "~/components/common/Avatar";

interface ProfileCardProps {
  imageURL: string;
  name: string;
  date?: Date;
}

const ProfileCard = ({ imageURL, date, name }: ProfileCardProps) => {
  return (
    <div className="ml-auto flex flex-row">
      <div className="mt-0.5">
        <h1 className="text-[0.80rem]   font-bold text-typography-body-light dark:text-typography-body-dark">
          {name}
        </h1>
        <p className="font-helvetica text-[0.75em] font-light text-typography-body-secondary-light dark:text-typography-body-faded-light">
          {date?.toDateString()}
        </p>
      </div>
      <Avatar
        style="mx-4 block  h-10 w-10 cursor-pointer  rounded-full object-cover"
        alt="avatar"
        src="/images/default-avatar.png"
        fallbackSrc="/images/default-avatar.png"
      />
    </div>
  );
};

export default ProfileCard;
