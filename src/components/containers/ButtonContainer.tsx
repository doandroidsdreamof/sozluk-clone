import Link from "next/link";
import React from "react";
import { DarkMode } from "../common/index";
import Button from "../modules/button/Button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const ButtonContainer = () => {
  const session = useSession();
  const registerLink = session.data == null ? "/register" : "/profile";
  const loginLink = session.data == null ? "/login" : "/";
  const registerButton = session.data == null ? "register" : "profile";
  const loginButton = session.data == null ? "login" : "sign out";

  const handleSignout = () => {
    if (loginButton === "sign out") {
      signOut().catch((err) => console.error(err));
    } else {
      return false;
    }
  };
  return (
    <div className="flex gap-x-2 ">
      <Link href={loginLink}>
        <Button
          onClick={() => handleSignout()}
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
