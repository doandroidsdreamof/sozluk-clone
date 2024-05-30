import { Field } from "formik";
import { type FC } from "react";
import FormError from "../forms/FormError";

interface IFormInputProps {
  type: string;
  name: string;
  placeholder?: string;
  style: string;
}

//TODO refactoring open-closed principle

const Input: FC<IFormInputProps> = ({
  type,
  name,
  placeholder,
  style,
}: IFormInputProps) => {
  return (
    <>
      <Field
        type={type}
        name={name}
        placeholder={placeholder || ""}
        className={style}
      />
      <FormError name={name} />
    </>
  );
};

export default Input;
