import React from "react";
import Modal from "../modules/modal/Modal";

interface FormLayoutProps {
  children: React.ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <div className="z-50  h-screen w-full bg-black opacity-75">
      <Modal>{children}</Modal>
    </div>
  );
};

export default FormLayout;
