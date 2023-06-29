import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ProfileLayout = dynamic(
  () => import("~/components/layouts/ProfileLayout"),
  { ssr: false }
);

const Profile: NextPage = () => {
  const router = useRouter();
  const { currentUser: userName } = router.query as {
    currentUser: string;
  };

  return <ProfileLayout userName={userName} />;
};

export default Profile;
