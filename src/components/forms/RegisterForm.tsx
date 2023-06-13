import { Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { type IRegister } from "~/@types/interface";
import { FormButton, Input } from "~/components/elements/index";
import { useAppDispatch } from "~/lib/store/hooks";
import {
  insertNotification,
  removeNotification,
  type AlertType,
} from "~/lib/store/reducers/notificationSlice";
import { clientRegisterSchema } from "~/schemas/index";
import { api } from "~/utils/api";
import { FormFooter } from "./index";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const loginValues = {
  userName: "",
  password: "",
  confirmPassword: "",
  email: "",
};

const RegisterForm = () => {
  const { mutate } = api.user.createUser.useMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const setAlert = (message: string, alertRaw: AlertType, timeout = 5000) => {
    const uid = nanoid();
    if (typeof alertRaw) {
      const alertType = alertRaw.toUpperCase() as AlertType;
      dispatch(insertNotification({ message, uid, alertType }));
      setTimeout(() => dispatch(removeNotification(uid)), timeout);
    }
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  async function handleRegister(data: IRegister) {
    const { confirmPassword, ...state } = data;
    const { email, password } = data;
    try {
      mutate(state, {
        onError: (err) => {
          console.log(err);
          setAlert("başarısız", "DANGER", 5000);
        },
        onSuccess: (data) => {
          if (data.success === false) {
            setAlert(data.message, "DANGER", 5000);
          } else {
            signIn("credentials", {
              email: email,
              password: password,
              redirect: false,
            })
              .then((res) => {
                if (res?.ok === true) {
                  router.push("/");
                  setAlert(data.message, "SUCCESS", 5000);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
      });
    } catch (err) {
      console.log("🚀 ~ file: Register.tsx:39 ~ Register ~ err:", err);
    }
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
        <div className="w-full ">
          <div className="mx-auto max-h-fit max-w-screen-2xl px-4 md:px-8">
            <Form className="mx-auto max-w-lg rounded-lg  ">
              <div className="flex flex-col gap-4 p-4 md:p-8 ">
                <div>
                  <label
                    htmlFor="user name"
                    className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
                  >
                    User name
                  </label>
                  <Input
                    type="text"
                    name="userName"
                    style={
                      "w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
                  >
                    Email
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
                    Password
                  </label>

                  <Input
                    type="password"
                    name="password"
                    style={
                      "w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
                  >
                    Confirm password
                  </label>

                  <Input
                    type="password"
                    name="confirmPassword"
                    style={
                      "w-full rounded border border-input-border-light bg-bg-secondary-light dark:bg-bg-secondary-dark px-3 py-2 text-black dark:text-white outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark"
                    }
                  />
                </div>
                <FormButton
                  text={"Register"}
                  style={
                    "block rounded-sm bg-brandGreen-800 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-brandGreen-700 focus-visible:ring  md:text-base"
                  }
                />
              </div>
              <FormFooter
                text={"Already have an account?"}
                href={"login"}
                linkText={"Login"}
              />
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default RegisterForm;
