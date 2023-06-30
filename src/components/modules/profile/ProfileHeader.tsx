import React, { useState } from "react";
import Avatar from "~/components/common/Avatar";
import DumbModal from "~/components/modals/DumbModal";
import Button from "../button/Button";
import ProfileIndicator from "./ProfileIndicator";
import { useSession } from "next-auth/react";

interface ProfileHeaderProps {
  entryCount: bigint;
  followersCount: bigint;
  followingCount: bigint;
  role: string;
  userName: string;
}

const ProfileHeader = ({
  entryCount,
  followersCount,
  followingCount,
  role,
  userName,
}: ProfileHeaderProps) => {
  const session = useSession();
  const [dumbOpen, setDumbOpen] = useState(false);

  return (
    <div className="flex w-full flex-row  ">
      <div className="flex flex-col gap-y-3">
        <span className="text-2xl font-bold text-typography-body-light dark:text-typography-body-dark ">
          {userName}
        </span>
        <Button
          className={"cursor-default hover:bg-brandGreen-800"}
          size="tiny"
          type="primary"
        >
          {role}
        </Button>
        <ProfileIndicator
          entryCount={entryCount.toString()}
          followers={followersCount.toString()}
          following={followingCount.toString()}
          userName={userName}
        />
      </div>
      <div className="ml-auto  pr-8 pt-3">
        <button
          onClick={() => setDumbOpen(true)}
          className=" flex w-16  cursor-default   items-center justify-center rounded-full "
        >
          <Avatar
            style={`mx-4 block ${
              session.data?.user?.name === userName
                ? "cursor-pointer"
                : "cursor-default "
            } h-16 w-16 rounded-full object-cover`}
            alt="avatar"
            src="/images/default-avatar.png"
            fallbackSrc="/images/default-avatar.png"
          />
        </button>
        {session.data?.user?.name === userName ? (
          <DumbModal
            closeDumbOpen={() => setDumbOpen(false)}
            dumbOpen={dumbOpen}
          >
            <div className="flex h-36 w-96 flex-col items-center justify-center ">
              <img
                className="mx-4  block h-20  w-20 rounded-full object-cover"
                alt="avatar"
                src="/images/default-avatar.png"
              />
            </div>
            <div className="flex flex-row gap-x-3 pb-2 pl-2">
              <Button size="tiny" type="primary">
                image upload
              </Button>
              <Button size="tiny" type="secondary">
                remove image
              </Button>
            </div>
          </DumbModal>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
