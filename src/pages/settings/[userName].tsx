import { type NextPage } from "next";
import dynamic from "next/dynamic";

const SettingsLayout = dynamic(
  () => import("@/components/layouts/SettingsLayout"),
  {
    ssr: false,
  }
);

const Settings: NextPage = () => {
  return <SettingsLayout />;
};

export default Settings;
