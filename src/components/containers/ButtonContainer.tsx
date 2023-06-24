import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutClick } from "~/lib/auth-helpers/logout";
import dynamic from "next/dynamic";
import DarkMode from "../common/DarkMode";

const Button = dynamic(() => import("~/components/modules/button/Button"), {
  ssr: false,
});

const ButtonContainer = () => {
  const session = useSession();
  const router = useRouter();
  const registerLink =
    session.data == null
      ? "/register"
      : `/profile/${session?.data?.user?.name || ""}`;
  const loginLink = session.data == null ? "/login" : "/";
  const registerButton = session.data == null ? "register" : "profile";
  const loginButton = session.data == null ? "login" : "sign out";

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
      <DarkMode />
    </div>
  );
};

export default ButtonContainer;
