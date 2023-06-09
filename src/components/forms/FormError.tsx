import React, { type FC } from "react";
import { ErrorMessage } from "formik";

interface FormErrorProps {
  name: string;
}

const FormError: FC<FormErrorProps> = ({ name }: FormErrorProps) => {
  return (
    <>
      <ErrorMessage
        className=" relative flex translate-y-1 border-white  text-xs text-red-700"
        component={"span"}
        name={name}
      />
    </>
  );
};

export default FormError;
