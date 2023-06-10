import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { DarkMode } from "~/components/common";
import { FormLayout } from "~/components/layouts";
import Modal from "~/components/modules/modal/Modal";
import { RegisterForm } from "~/components/forms/index";

const Register: NextPage = () => {
  return (
    <>
      <FormLayout>
        <RegisterForm />
      </FormLayout>
    </>
  );
};

export default Register;
