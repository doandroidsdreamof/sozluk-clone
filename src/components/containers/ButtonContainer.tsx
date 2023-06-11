import Link from "next/link";
import React from "react";
import { DarkMode } from "../common/index";
import Button from "../modules/button/Button";
import { useSession } from "next-auth/react";

const ButtonContainer = () => {
  const { data: session } = useSession();
  const registerLink = session == null ? "/register" : "/profile";
  const loginLink = session == null ? "/login" : "/";
  const registerButton = session == null ? "register" : "profile";
  const loginButton = session == null ? "login" : "sign out";

  return (
    <div className="flex gap-x-2">
      <Link href={loginLink}>
        <Button
          className="dark:bg-dark-600 dark:text-typography-body-dark dark:hover:bg-dark-500"
          size="tiny"
          type="secondary"
        >
          {loginButton}
        </Button>
      </Link>
      <Link href={registerLink}>
        <Button size="tiny" type="primary">
          {registerButton}
        </Button>
      </Link>

      <DarkMode />
    </div>
  );
};

export default ButtonContainer;
