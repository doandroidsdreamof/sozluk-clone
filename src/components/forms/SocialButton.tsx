import { signIn } from "next-auth/react";
import React from "react";

interface SocialButtonProps {
  icon: JSX.Element;
  text: string;
  style: string;
}

const SocialButton = ({ icon, text, style }: SocialButtonProps) => {
  const provider = text === "Continue with Facebook" ? "facebook" : "google";
  return (
    <button
      onClick={() =>
        void signIn(provider).catch((err) => console.log("social login", err))
      }
      className={`${style}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SocialButton;
