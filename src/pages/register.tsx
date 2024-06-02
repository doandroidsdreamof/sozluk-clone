import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/lib/store/hooks";

const FormLayout = dynamic(() => import("@/components/layouts/FormLayout"), {
  ssr: false,
});

const FormMachine = dynamic(() => import("@/components/forms/FormMachine"), {
  ssr: false,
});
const Register: NextPage = () => {
  const registerState = useAppSelector(
    (state) => state.navigation.navigationState
  );

  return (
    <FormLayout>
      <FormMachine displayState={registerState} />
    </FormLayout>
  );
};

export default Register;
