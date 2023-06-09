import React from "react";

interface FormButtonProps {
  text: string;
  style: string;
}
const FormButton = ({ text, style }: FormButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`${style}`}
    >
      {text}
    </button>
  );
};

export default FormButton;
