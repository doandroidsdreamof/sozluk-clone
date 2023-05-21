import { FC } from "react";
import { Field, Form, Formik, FormikProps } from 'formik';



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
  style
}: FormInputProps) => {
  return (
    <>
    {
      name === 'test' ?
      <input
      type={type}
      name={name}
      placeholder={placeholder || ""}
      className={style}
    />
    :
    <Field
    type={type}
    name={name}
    placeholder={placeholder || ""}
    className={style}
  />
    }

    </>
  );
};

export default Input;
