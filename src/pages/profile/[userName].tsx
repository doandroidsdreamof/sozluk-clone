import { type NextPage } from "next";
import { useRouter } from "next/router";
import { ProfileLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query as {
    userName: string;
  };

  return <ProfileLayout />;
};

export default Profile;
