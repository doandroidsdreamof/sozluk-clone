import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Profile: NextPage = () => {
  return (
    <div className="flex w-full items-center justify-center bg-white text-center">
      profile page
    </div>
  );
};

export default Profile;
