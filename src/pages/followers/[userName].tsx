import { type NextPage } from "next";
import { useRouter } from "next/router";
import FollowersLayout from "~/components/layouts/FollowersLayout";

const Followers: NextPage = () => {
  const router = useRouter();
  const { userName: userName } = router.query as {
    userName: string;
  };
  return (
    <>
      <FollowersLayout userName={userName} />
    </>
  );
};

export default Followers;
