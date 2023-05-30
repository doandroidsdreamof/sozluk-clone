import React from "react";

interface SocialButtonProps {
  icon: JSX.Element;
  text: string;
  style: string;
}

const SocialButton = ({ icon, text, style }: SocialButtonProps) => {
  // console.log("🚀 ~ file: SocialButton.tsx:10 ~ SocialButton ~ text:", text)
  return (
    <button className={`${style}`}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SocialButton;
