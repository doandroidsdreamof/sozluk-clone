import React from "react";
import VerificationForm from "./VerificationForm";
import RegisterForm from "./RegisterForm";

interface FormMachineProps {
  displayState: boolean;
}

function FormMachine({ displayState }: FormMachineProps) {
  return displayState ? <RegisterForm /> : <VerificationForm />;
}

export default FormMachine;
