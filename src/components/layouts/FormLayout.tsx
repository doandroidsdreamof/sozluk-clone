import React from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("~/components/modals/Modal"), {
  ssr: true,
});

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
