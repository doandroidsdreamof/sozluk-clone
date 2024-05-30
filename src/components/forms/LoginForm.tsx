import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { type ILogin } from "@/@types/interface";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  type AlertType,
  insertNotification,
  removeNotification,
} from "@/lib/store/reducers/notificationSlice";
import { loginSchema } from "@/schemas/loginSchema";
import Input from "../elements/Input";
import FormButton from "../elements/FormButton";
import FormFooter from "./FormFooter";
import SocialButton from "./SocialButton";
import {
  BUTTON_TEXT,
  CLIENT_ROUTE_PATHS,
  LABEL_TEXT,
  LINK_TEXT,
  LOG_MESSAGES,
  UI_MESSAGES,
} from "@/constants/staticContents";
import {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPES,
} from "@/constants/notificationConstants";
import GoogleIcon from "../common/GoogleIcon";
import { useLoading } from "@/hooks/useLoading";

const loginValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();

  //TODO refactoring code duplication with RegisterForm

  const setAlert = (message: string, alertRaw: AlertType, timeout = 5000) => {
    const uid = nanoid();
    if (typeof alertRaw) {
      const alertType = alertRaw.toUpperCase() as AlertType;
      dispatch(insertNotification({ message, uid, alertType }));
      setTimeout(() => dispatch(removeNotification(uid)), timeout);
    }
  };

  const handleSocialLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" }, { prompt: "login" });
    } catch (err) {
      console.error(LOG_MESSAGES.ERR_SOCIAL_LOGIN_FAILED, err);
    }
  };

  async function handleLogin(data: ILogin) {
    startLoading();
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.ok === true) {
        router.push("/");
        setAlert(
          NOTIFICATION_MESSAGES.LOGIN_SUCCESSFUL,
          NOTIFICATION_TYPES.SUCCESS,
          5000
        );
      } else {
        setAlert(
          NOTIFICATION_MESSAGES.WRONG_CREDENTIALS,
          NOTIFICATION_TYPES.DANGER,
          5000
        );
      }
    } catch (err) {
      console.error(err);
      setAlert(
        NOTIFICATION_MESSAGES.LOGIN_UNSUCCESSFUL,
        NOTIFICATION_TYPES.DANGER,
        5000
      );
    }
    stopLoading();
  }

  return (
    <>
      <Formik
        initialValues={loginValues}
        validationSchema={toFormikValidationSchema(loginSchema)}
        onSubmit={(values) => {
          handleLogin(values).catch((err) => console.error(err));
        }}
      >
        <div className="w-full">
          <div className="mx-auto max-w-screen-2xl px-4">
            <Form className="mx-auto max-w-lg rounded-lg">
              <div className="flex flex-col gap-4 p-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
                  >
                    {LABEL_TEXT.EMAIL}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    style={
                      "w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
                  >
                    {LABEL_TEXT.PASSWORD}
                  </label>
                  <Input
                    type="password"
                    name="password"
                    style={
                      "w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                    }
                  />
                </div>
                <FormButton
                  text={BUTTON_TEXT.LOGIN}
                  isLoading={isLoading}
                  style={
                    "block rounded-sm bg-brandGreen-800 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-brandGreen-700 focus-visible:ring  md:text-base"
                  }
                />
                <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                  <span className="relative bg-bg-secondary-light px-4 text-sm text-gray-400 dark:bg-bg-secondary-dark">
                    or
                  </span>
                </div>
                <SocialButton
                  handleLogin={handleSocialLogin}
                  text={BUTTON_TEXT.GOOGLE_LOGIN}
                  style={
                    "flex items-center justify-center gap-2 rounded-sm border border-gray-300 hover:bg-white bg-gray-200 px-8 py-2 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                  }
                  icon={<GoogleIcon />}
                />
              </div>
              <FormFooter
                text={UI_MESSAGES.DO_NOT_ACCOUNT}
                href={CLIENT_ROUTE_PATHS.REGISTER}
                linkText={LINK_TEXT.REGISTER}
              />
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default LoginForm;
