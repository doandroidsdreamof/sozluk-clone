import React from "react";
import { useSession } from "next-auth/react";

const SettingsLayout = () => {
  const session = useSession();

  return (
    <div className=" top-0 flex min-h-screen w-full flex-col justify-between gap-4 border p-3  md:mx-auto  lg:w-[46rem]  lg:pl-20">
      Settings
    </div>
  );
};

export default SettingsLayout;
