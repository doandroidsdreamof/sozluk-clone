import React from "react";
import { useAppDispatch, useAppSelector } from "~/lib/store/hooks";
import {
  insertNotification,
  removeNotification,
} from "~/lib/store/reducers/notificationSlice";

interface AlertMessageProps {
  msg: string;
  alertType: string;
  id: string;
}

type StyleAlert<T> = {
  [key: string]: T;
};

const sharedStyle =
  "relative  z-50 mb-4 ml-auto flex w-full items-center rounded-lg p-4 text-sm ";
const alertStyle: StyleAlert<string> = {
  DANGER: `${sharedStyle} bg-red-50 dark:bg-gray-800 dark:text-red-400`,
  SUCCESS: `${sharedStyle} bg-green-50  text-blue-800 dark:bg-gray-800 dark:text-blue-400`,
  ALERT: `${sharedStyle} bg-yellow-50  dark:bg-gray-800 dark:text-green-400`,
  WARNING: `${sharedStyle} dark:bg-gray-800 dark:text-yellow-300`,
};

const AlertMessage = ({ msg, alertType, id }: AlertMessageProps) => {
  const dispatch = useAppDispatch();

  const handleClose = (uid: string) => {
    dispatch(removeNotification(uid));
  };

  return (
    <>
      {alertStyle[alertType] ? (
        <div className={alertStyle[alertType]} role="alert">
          <div>{msg}</div>
          <button
            type="button"
            onClick={() => handleClose(id)}
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AlertMessage;
