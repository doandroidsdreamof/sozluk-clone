import React from "react";
import { LOG_MESSAGES } from "@/constants/staticContents";

interface ISocialButtonProps {
  icon: JSX.Element;
  text: string;
  style: string;
  handleLogin: () => Promise<void>;
}

const SocialButton = ({
  icon,
  text,
  style,
  handleLogin,
}: ISocialButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleLogin().catch((err) => {
          console.error(LOG_MESSAGES.ERR_SOCIAL_LOGIN_FAILED, err);
        });
      }}
      className={`${style}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SocialButton;
