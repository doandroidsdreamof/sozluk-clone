import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { DarkMode } from "~/components/common";
import { FormLayout } from "~/components/layouts";
import Modal from "~/components/modal/Modal";
import { LoginForm } from "~/components/forms/index";

const Login: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <FormLayout>
        <LoginForm />
      </FormLayout>
    </>
  );
};

export default Login;
