import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormButton from "../elements/FormButton";

import { magic } from "~/lib/auth-helpers/magic";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FormFooter from "./FormFooter";
import Input from "../elements/Input";
import { emailSchema } from "~/schemas/emailSchema";
import { api } from "~/utils/api";
import { setNavigation, setParsed } from "~/lib/store/reducers/navigationSlice";
import { useAppDispatch } from "~/lib/store/hooks";

type loginFormType = {
  email: string;
};
const loginValues: loginFormType = {
  email: "",
};

const VerificationForm = () => {
  const [killMagic, setKillMagic] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [parsedData, setParsedData] = useState<string>("");
  const router = useRouter();
  const { data } = api.user.emailVerification.useQuery(token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (killMagic === true && data === true) {
      dispatch(setNavigation(true));
      dispatch(setParsed(parsedData));
      return () => {
        console.log("==========> cleanup success");
        magicLogout().catch((err) => console.log(err));
      };
    }
  }, [killMagic, data]);

  async function handleSubmit(email: loginFormType) {
    if (!magic) throw new Error(`magic not defined`);
    const { email: parsedCheck }: { email: string } = email;
    const emailVerification = await magic?.auth?.loginWithEmailOTP(email);
    const isLoggedIn = await magic?.user?.isLoggedIn();
    if (emailVerification) {
      setToken(emailVerification);
      setParsedData(parsedCheck);
      setKillMagic(true);
    }
  }

  async function magicLogout() {
    try {
      if (!magic) throw new Error(`magic not defined`);
      await magic?.user?.logout();
    } catch (err) {
      console.log(
        "🚀 ~ file: MagicVerification.tsx:64 ~ magicLogout ~ err:",
        err
      );
    }
  }

  return (
    <Formik
      initialValues={loginValues}
      validationSchema={toFormikValidationSchema(emailSchema)}
      onSubmit={(values) => {
        handleSubmit(values).catch((err) => console.error(err));
      }}
    >
      <Form className="mt-4  space-y-6 px-6">
        <div className="flex flex-col gap-y-5">
          <span className="relative bg-bg-secondary-light text-sm text-gray-400 dark:bg-bg-secondary-dark">
            Verify your account
          </span>
          <Input
            type="email"
            name="email"
            style={
              "w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
            }
          />
        </div>
        <div className="flex flex-col gap-y-5">
          <FormButton
            text={"Send Code"}
            style={
              "block rounded-sm bg-brandGreen-800 px-8 py-2 mt-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-brandGreen-700 focus-visible:ring  md:text-base"
            }
          />
          <FormFooter
            text={"Already have an account?"}
            href={"login"}
            linkText={"Login"}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default VerificationForm;
