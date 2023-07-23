import { Field } from "formik";
import { type FC } from "react";
import FormError from "../forms/FormError";

interface FormInputProps {
  type: string;
  name: string;
  placeholder?: string;
  style: string;
}

const Input: FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  style,
}: FormInputProps) => {
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
