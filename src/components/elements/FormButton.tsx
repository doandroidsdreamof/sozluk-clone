import React from "react";
import ButtonStyles from "@/components/modules/button/Button.module.css";

interface IFormButtonProps {
  text: string;
  style: string;
  isLoading?: boolean;
}
const FormButton = ({ text, style, isLoading = false }: IFormButtonProps) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`${style}`}
    >
      {isLoading ? (
        <div className="relative h-5 py-2">
          <span className={ButtonStyles["button--loading"]}></span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default FormButton;
