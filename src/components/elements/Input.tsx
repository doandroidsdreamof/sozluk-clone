import { FC } from "react";
import { Field, Form, Formik, FormikProps } from 'formik';
import { FormError } from "../form";


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
    {
      name === 'test' ?
      <input
      type={type}
      name={name}
      placeholder={placeholder || ""}
      className={style}
    />
    :

    <div className="">
      <Field
            
            type={type}
            name={name}
            placeholder={placeholder || ""}
            className={style} /><FormError name={name} /></div>

    }

    </>
  );
};

export default Input;
