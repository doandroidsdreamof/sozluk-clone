import React, { FC } from "react";
import VerificationForm from "./VerificationForm";
import RegisterForm from "./RegisterForm";

interface FormMachineProps {
  displayState: boolean;
}

function FormMachine({ displayState }: FormMachineProps) {
  if (displayState) {
    return (
      <>
        {" "}
        <RegisterForm />
      </>
    );
  } else {
    return (
      <>
        {" "}
        <VerificationForm />
      </>
    );
  }
}

export default FormMachine;
