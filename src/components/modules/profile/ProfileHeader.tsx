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
      </div>
    </div>
  );
};

export default ProfileHeader;
