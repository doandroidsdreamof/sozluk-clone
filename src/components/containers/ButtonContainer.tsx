import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { logoutClick } from "@/lib/auth-helpers/logout";
import DarkMode from "../common/DarkMode";
import ChatButton from "@/components/modules/chat/ChatButton";
import {
  BUTTON_TEXT,
  CLIENT_ROUTE_PATHS,
  LOG_MESSAGES,
} from "@/constants/staticContents";

const Button = dynamic(() => import("@/components/modules/button/Button"), {
  ssr: false,
});

const ButtonContainer = () => {
  const session = useSession();
  const getProfilePath = (userName: string) =>
    `${CLIENT_ROUTE_PATHS.PROFILE}/${userName}`;

  const registerLink =
    session?.data == null
      ? CLIENT_ROUTE_PATHS.REGISTER
      : getProfilePath(session?.data?.user.name || "");
  const loginLink =
    session.data == null ? CLIENT_ROUTE_PATHS.LOGIN : CLIENT_ROUTE_PATHS.HOME;
  const registerButtonLabel =
    session.data == null ? BUTTON_TEXT.REGISTER : BUTTON_TEXT.PROFILE;
  const loginButtonLabel =
    session.data == null ? BUTTON_TEXT.SIGN_IN : BUTTON_TEXT.SIGN_OUT;

  const handleSignout = async (): Promise<boolean> => {
    try {
      if (loginButtonLabel === BUTTON_TEXT.SIGN_OUT) {
        await logoutClick();
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(LOG_MESSAGES.ERR_SIGN_OUT, err);
      return false;
    }
  };

  return (
    <div className="flex gap-x-2">
      <Link href={loginLink}>
        <Button
          onClick={() => {
            handleSignout()
              .then((result) => {
                if (!result) {
                  console.error(LOG_MESSAGES.ERR_SIGN_OUT_FAILED);
                }
              })
              .catch((err) =>
                console.error(LOG_MESSAGES.ERR_DURING_SIGN_OUT, err)
              );
          }}
          className="dark:bg-dark-600 dark:text-typography-body-dark dark:hover:bg-dark-500"
          size="tiny"
          type="secondary"
        >
          {loginButtonLabel}
        </Button>
      </Link>
      <Link href={registerLink}>
        <Button size="tiny" type="primary">
          {registerButtonLabel}
        </Button>
      </Link>
      {session.data?.user && <ChatButton />}
      <DarkMode />
    </div>
  );
};

export default ButtonContainer;
