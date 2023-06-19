import React from "react";
import { Button } from "../index";
import { Avatar } from "~/components/common/index";

interface ProfileHeaderProps {
  entryCount: string;
  followers: string;
  following: string;
  role: string;
}

const ProfileHeader = () => {
  return (
    <div className="flex w-full flex-row  ">
      <div className="flex flex-col gap-y-3">
        <span className="text-xl font-bold text-typography-body-light dark:text-typography-body-dark ">
          UserName
        </span>
        <Button size="tiny" type="primary">
          Noob
        </Button>
      </div>
      <div className="ml-auto">
        <Avatar
          style="mx-4 block  h-16 w-16 cursor-pointer rounded-full object-cover"
          alt="avatar"
          src="/images/default-avatar.png"
          fallbackSrc="/images/default-avatar.png"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
