import { type NextPage } from "next";
import dynamic from "next/dynamic";

const FollowersLayout = dynamic(
  () => import("@/components/layouts/FollowersLayout"),
  {
    ssr: false,
  }
);

const Followers: NextPage = () => {
  return (
    <>
      <FollowersLayout />
    </>
  );
};

export default Followers;
