import React from "react";
import VerificationForm from "./VerificationForm";
import RegisterForm from "./RegisterForm";

interface IFormMachineProps {
  displayState: boolean;
}

function FormMachine({ displayState }: IFormMachineProps) {
  return displayState ? <RegisterForm /> : <VerificationForm />;
}

export default FormMachine;
