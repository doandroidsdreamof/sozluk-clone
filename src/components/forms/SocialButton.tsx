import { signIn } from "next-auth/react";
import React from "react";

interface SocialButtonProps {
  icon: JSX.Element;
  text: string;
  style: string;
}

const SocialButton = ({ icon, text, style }: SocialButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        void signIn("google", { callbackUrl: "/" }, { prompt: "login" }).catch(
          (err) => console.error("social login", err)
        );
      }}
      className={`${style}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SocialButton;
