import { type NextPage } from "next";
import dynamic from "next/dynamic";

const FormLayout = dynamic(() => import("~/components/layouts/FormLayout"), {
  ssr: false,
});

const RegisterForm = dynamic(() => import("~/components/forms/RegisterForm"), {
  ssr: false,
});

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
