import { type NextPage } from "next";

import { useSession } from "next-auth/react";
import { DarkMode } from "~/components/common";
import { FormLayout } from "~/components/layouts";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return <></>;
};

export default Home;
