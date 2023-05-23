import React, { type FC } from "react";
import { ErrorMessage } from "formik";

interface FormErrorProps {
  name: string;
}

const FormError: FC<FormErrorProps> = ({ name }: FormErrorProps) => {
  return (
    <>
      <ErrorMessage
        className="inline-flex  text-xs text-error-message"
        component={"span"}
        name={name}
      />
    </>
  );
};

export default FormError;