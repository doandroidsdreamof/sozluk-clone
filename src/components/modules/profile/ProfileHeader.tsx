import React, { useState } from "react";
import { Button } from "../index";
import { Avatar } from "~/components/common/index";
import { DumbModal } from "~/components/modals/index";

interface ProfileHeaderProps {
  entryCount: string;
  followers: string;
  following: string;
  role: string;
}

const ProfileHeader = () => {
  const [dumbOpen, setDumbOpen] = useState(false);

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
        <button
          onClick={() => setDumbOpen(true)}
          className=" flex w-16  cursor-pointer items-center justify-center rounded-full "
        >
          <Avatar
            style="mx-4 block cursor-pointer  h-16 w-16 rounded-full object-cover"
            alt="avatar"
            src="/images/default-avatar.png"
            fallbackSrc="/images/default-avatar.png"
          />
        </button>

        <DumbModal closeDumbOpen={() => setDumbOpen(false)} dumbOpen={dumbOpen}>
          <div className="h-36 w-96 border border-white">
            <img
              className="mx-4 block h-16  w-16 cursor-pointer rounded-full object-cover"
              alt="avatar"
              src="/images/default-avatar.png"
            />
          </div>
        </DumbModal>
      </div>
    </div>
  );
};

export default ProfileHeader;
