import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  type Session,
  SessionContextProvider,
} from "@supabase/auth-helpers-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";
import { BaseLayout } from "~/components/layout/index";
import { store } from "~/lib/store/store";
import "~/styles/globals.css";
import { api } from "~/utils/api";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionContextProvider>
    </Provider>
  );
}

export default api.withTRPC(MyApp);
