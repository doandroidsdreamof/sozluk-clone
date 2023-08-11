import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { type ILogin } from "~/@types/interface";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useAppDispatch } from "~/lib/store/hooks";
import {
  type AlertType,
  insertNotification,
  removeNotification,
} from "~/lib/store/reducers/notificationSlice";
import { loginSchema } from "~/schemas/loginSchema";
import Input from "../elements/Input";
import FormButton from "../elements/FormButton";
import FormFooter from "./FormFooter";
import SocialButton from "./SocialButton";

const loginValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const setAlert = (message: string, alertRaw: AlertType, timeout = 5000) => {
    const uid = nanoid();
    if (typeof alertRaw) {
      const alertType = alertRaw.toUpperCase() as AlertType;
      dispatch(insertNotification({ message, uid, alertType }));
      setTimeout(() => dispatch(removeNotification(uid)), timeout);
    }
  };

  async function handleLogin(data: ILogin) {
    try {
      await signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.ok === true) {
            router.push("/");
            setAlert("login is success", "SUCCESS", 5000);
          } else {
            setAlert("email or password is wrong", "DANGER", 5000);
          }
        })
        .catch((err) => {
          console.error(err);
          setAlert("login is not success", "DANGER", 5000);
        });
    } catch (err) {
      console.error("🚀 ~ file: Login.tsx:27 ~ handleRegister ~ err:", err);
    }
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
                <FormButton
                  text={"Log in"}
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
                  text={"Continue with Google"}
                  style={
                    "flex items-center justify-center gap-2 rounded-sm border border-gray-300 hover:bg-white bg-gray-200 px-8 py-2 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                  }
                  icon={
                    <svg
                      className="h-5 w-5 shrink-0"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                        fill="#EA4335"
                      />
                    </svg>
                  }
                />
              </div>

              <FormFooter
                text={"Dont have an account?"}
                href={"register"}
                linkText={"Register"}
              />
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default LoginForm;
