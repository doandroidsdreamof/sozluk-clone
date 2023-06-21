import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ProfileLayout = dynamic(
  () => import("~/components/layouts/ProfileLayout"),
  { ssr: false }
);

const Profile: NextPage = () => {
  const router = useRouter();
  const { userName: currentUser } = router.query as {
    userName: string;
  };

  return <ProfileLayout />;
};

export default Profile;
