import { Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { type IRegister } from "@/@types/interface";
import FormButton from "../elements/FormButton";
import Input from "../elements/Input";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  insertNotification,
  removeNotification,
  type AlertType,
} from "@/lib/store/reducers/notificationSlice";
import { clientRegisterSchema } from "@/schemas/clientRegisterSchema";
import { api } from "@/utils/api";
import FormFooter from "./FormFooter";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { setNavigation } from "@/lib/store/reducers/navigationSlice";
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
import { useLoading } from "@/hooks/useLoading";

const loginValues = {
  userName: "",
  password: "",
  confirmPassword: "",
  email: "",
};

const RegisterForm = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { mutateAsync } = api.user.createUser.useMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const parsedState = useAppSelector(
    (state) => state.navigation.magicLinkEmail
  );

  const setAlert = (message: string, alertRaw: AlertType, timeout = 5000) => {
    const uid = nanoid();
    if (typeof alertRaw) {
      const alertType = alertRaw.toUpperCase() as AlertType;
      dispatch(insertNotification({ message, uid, alertType }));
      setTimeout(() => dispatch(removeNotification(uid)), timeout);
    }
  };

  async function handleRegister(data: IRegister) {
    startLoading();
    try {
      const { email, password, userName } = data;
      if (email !== parsedState) {
        setAlert(
          NOTIFICATION_MESSAGES.EMAIL_SHOULD_BE_THE_SAME,
          NOTIFICATION_TYPES.DANGER,
          5000
        );

        dispatch(setNavigation(false));
        return;
      }
      const response = await mutateAsync({
        email,
        password,
        userName,
      });

      if (!response.success) {
        setAlert(response.message, NOTIFICATION_TYPES.DANGER, 5000);
        return;
      }

      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResponse?.ok) {
        setAlert(response.message, NOTIFICATION_TYPES.SUCCESS, 5000);
        router.push("/");
      } else {
        setAlert(
          NOTIFICATION_MESSAGES.REGISTRATION_FAILED,
          NOTIFICATION_TYPES.DANGER,
          5000
        );
      }
    } catch (err) {
      console.error(LOG_MESSAGES.ERR_REGISTER_FAILED, err);
      setAlert(
        NOTIFICATION_MESSAGES.REGISTRATION_FAILED,
        NOTIFICATION_TYPES.DANGER,
        5000
      );
    }
    stopLoading();
  }

  return (
    <>
      <Formik
        validationSchema={toFormikValidationSchema(clientRegisterSchema)}
        initialValues={loginValues}
        onSubmit={(values) => {
          handleRegister(values).catch((err) => console.error(err));
        }}
      >
        <div className="w-full">
          <div className="mx-auto max-h-fit px-4">
            <Form className="mx-auto max-w-lg rounded-lg">
              <div className="flex flex-col gap-4 p-4">
                <div>
                  <label
                    htmlFor="userName"
                    className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
                  >
                    {LABEL_TEXT.USER_NAME}
                  </label>
                  <Input
                    type="text"
                    name="userName"
                    style="w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                  />
                </div>

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
                    style="w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
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
                    style="w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
                  >
                    {LABEL_TEXT.CONFIRM_PASSWORD}
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    style="w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                  />
                </div>

                <FormButton
                  isLoading={isLoading}
                  text={BUTTON_TEXT.REGISTER}
                  style="block rounded-sm bg-brandGreen-800 px-8 py-2 mt-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-brandGreen-700 focus-visible:ring md:text-base"
                />
              </div>
              <FormFooter
                text={UI_MESSAGES.HAVE_YOU_ACCOUNT}
                href={CLIENT_ROUTE_PATHS.LOGIN}
                linkText={LINK_TEXT.LOGIN}
              />
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default RegisterForm;
