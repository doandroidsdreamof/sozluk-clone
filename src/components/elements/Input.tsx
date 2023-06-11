import { Field } from "formik";
import { type FC } from "react";
import { FormError } from "../forms";

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
      {name === "test" ? (
        <input
          type={type}
          name={name}
          placeholder={placeholder || ""}
          className={style}
        />
      ) : (
        <div className="">
          <Field
            type={type}
            name={name}
            placeholder={placeholder || ""}
            className={style}
          />
          <FormError name={name} />
        </div>
      )}
    </>
  );
};

export default Input;
