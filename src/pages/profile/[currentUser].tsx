import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// TODO currentUser will be change beacuse it's not only current profile page but also regular user profile page

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
