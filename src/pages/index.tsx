import { type NextPage } from "next";

import { useSession } from "next-auth/react";
import { DarkMode } from "~/components/common";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <DarkMode />
    </>
  );
};

export default Home;
