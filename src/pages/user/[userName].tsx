import { type NextPage } from "next";
import { useRouter } from "next/router";
import { UserLayout } from "~/components/layouts/index";
import { api } from "~/utils/api";

const User: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query as {
    userName: string;
  };

  return <UserLayout />;
};

export default User;
