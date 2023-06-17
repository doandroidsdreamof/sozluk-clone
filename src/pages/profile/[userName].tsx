import { type NextPage } from "next";
import { useRouter } from "next/router";
import { TopicLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

const Profile: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query as {
    userName: string;
  };

  return <></>;
};

export default Profile;
