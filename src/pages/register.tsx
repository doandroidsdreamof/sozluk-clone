import { type NextPage } from "next";
import { RegisterForm } from "~/components/forms/index";
import { FormLayout } from "~/components/layouts";

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
