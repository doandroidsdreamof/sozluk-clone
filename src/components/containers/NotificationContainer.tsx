import React from "react";
import { useAppSelector } from "~/lib/store/hooks";
import { AlertMessage } from "../common/index";

const NotificationContainer = () => {
  const alerts = useAppSelector((state) => state.notification);

  return (
    <div
      className={
        alerts.length > 0
          ? "lg:max-w-thirtythree fixed  bottom-2 right-3 z-50  ml-auto w-full px-4 md:top-7 md:max-w-forty"
          : "hidden"
      }
    >
      {alerts &&
        alerts.map((items) => (
          <AlertMessage
            msg={items.message}
            id={items.uid}
            alertType={items.alertType}
            key={items.uid}
          />
        ))}
    </div>
  );
};

export default NotificationContainer;
