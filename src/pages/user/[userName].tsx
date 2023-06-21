import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const UserLayout = dynamic(() => import("~/components/layouts/UserLayout"), {
  ssr: false,
});

const User: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query as {
    userName: string;
  };

  return <UserLayout />;
};

export default User;
