import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DocHead } from "~/components/common/index";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <DocHead />
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
