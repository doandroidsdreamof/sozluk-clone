import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { logoutClick } from "~/lib/auth-helpers/logout";
import DarkMode from "../common/DarkMode";
import ChatButton from "~/components/modules/chat/ChatButton";

const Button = dynamic(() => import("~/components/modules/button/Button"), {
  ssr: false,
});

const ButtonContainer = () => {
  const session = useSession();

  const registerLink =
    session.data == null
      ? "/register"
      : `/profile/${session?.data.user.name || ""}`;
  const loginLink = session.data == null ? "/login" : "/";
  const registerButton = session.data == null ? "register" : "profile";
  const loginButton = session.data == null ? "sign in" : "sign out";

  const handleSignout = () => {
    if (loginButton === "sign out") {
      logoutClick().catch((err) => console.error(err));
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
      {session.data?.user ? <ChatButton /> : <></>}
      <DarkMode />
    </div>
  );
};

export default ButtonContainer;
