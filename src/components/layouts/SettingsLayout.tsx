import React from "react";
import { UI_MESSAGES } from "~/constants/staticContents";

const SettingsLayout = () => {
  return (
    <div className="top-0 flex min-h-screen w-full flex-col justify-between gap-4 border p-3 md:mx-auto lg:w-[46rem] lg:pl-20">
      {UI_MESSAGES.SETTINGS}
    </div>
  );
};

export default SettingsLayout;
