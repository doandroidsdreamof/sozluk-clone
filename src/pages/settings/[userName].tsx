import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const SettingsLayout = dynamic(
  () => import("~/components/layouts/SettingsLayout"),
  {
    ssr: false,
  }
);

const Settings: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query as {
    userName: string;
  };

  return <SettingsLayout />;
};

export default Settings;
