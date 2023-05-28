import { Form, Formik } from "formik";
import Link from "next/link";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input, Button } from "~/components/elements/index";
import { clientRegisterSchema } from "~/schemas/index";
import { FormError, FormFooter } from "./index";
import { type IRegister } from "~/@types/interface";
import { api } from "~/utils/api";
import { signIn } from "next-auth/react";

const loginValues = {
  userName: "",
  password: "",
  confirmPassword: "",
  email: "",
};

const Register = () => {
  const { mutate } = api.user.insertUser.useMutation();


  // eslint-disable-next-line @typescript-eslint/require-await
  async function handleRegister(data: IRegister) {
    const { confirmPassword, ...state } = data;
    try {
      mutate(state, {
        onError: (err) => {
          console.log(err);
          console.log("başarısız ve mesaj göster");
        },
        onSuccess: () => {
          console.log("başarılı yönlendir ve mesaj göster");

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
        <div className="w-full py-6   sm:py-8 lg:py-12">
          <div className="mx-auto max-h-fit max-w-screen-2xl px-4 md:px-8">
            <Form className="mx-auto max-w-lg rounded-lg border border-input-border-light bg-bg-secondary-light dark:border-input-border-dark dark:bg-bg-secondary-dark ">
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
                <Button
                  text={"Register"}
                  style={
                    "block rounded-md bg-brandGreen-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-brandGreen-700 focus-visible:ring  md:text-base"
                  }
                />
              </div>
              <div></div>

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

export default Register;
