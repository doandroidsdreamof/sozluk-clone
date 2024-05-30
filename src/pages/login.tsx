import { type NextPage } from "next";
import dynamic from "next/dynamic";

const FormLayout = dynamic(() => import("@/components/layouts/FormLayout"), {
  ssr: false,
});

const LoginForm = dynamic(() => import("@/components/forms/LoginForm"), {
  ssr: false,
});

const Login: NextPage = () => {
  return (
    <>
      <FormLayout>
        <LoginForm />
      </FormLayout>
    </>
  );
};

export default Login;
