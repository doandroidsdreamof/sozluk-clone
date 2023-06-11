import { type NextPage } from "next";

import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return <></>;
};

export default Home;
