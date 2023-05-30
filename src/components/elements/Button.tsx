import React from "react";

interface ButtonProps {
  text: string;
  style: string;
}
const Button = ({ text, style }: ButtonProps) => {
  return <button type="button" onClick={(e)=>{
    e.stopPropagation();
  }}  className={`${style}`}>{text}</button>;
};

export default Button;
