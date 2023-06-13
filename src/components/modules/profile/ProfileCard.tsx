import React from "react";

interface ProfileCardProps {
  imageURL: string;
  name: string;
  date: Date;
}

const ProfileCard = () => {
  return (
    <>
      <div className="">
        <h1 className="text-[0.80rem] font-bold text-typography-body-light dark:text-typography-body-dark">
          Khatab wedaa
        </h1>
        <p className="font-helvetica text-[0.75em] font-light text-typography-body-secondary-light dark:text-typography-body-faded-light">
          mar 10, 2019
        </p>
      </div>
      <img
        className="mx-4 block h-10 w-10 cursor-pointer  rounded-full object-cover"
        src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
        alt="avatar"
      />
    </>
  );
};

export default ProfileCard;
