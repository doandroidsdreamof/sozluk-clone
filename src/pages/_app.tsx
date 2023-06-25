import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import BaseLayout from "~/components/layouts/BaseLayout";
import { store } from "~/lib/store/store";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { useReportWebVitals } from "next/web-vitals";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  // useReportWebVitals((metric) => {
  //   console.info(metric);
  // });

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
