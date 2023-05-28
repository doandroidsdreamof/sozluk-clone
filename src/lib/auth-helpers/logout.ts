import { signOut } from "next-auth/react";

export const logoutClick = async () => {
  try {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    })
  } catch (err) {
    console.error(err);
  }
};