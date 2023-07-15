import { useRouter } from "next/router";
import { type ILayoutProps } from "~/@types/interface";
import DocHead from "../common/DocHead";
import dynamic from "next/dynamic";

const ScrollUpButton = dynamic(
  () => import("~/components/common/ScrollUpButton"),
  { ssr: false }
);

const NotificationContainer = dynamic(
  () => import("~/components/containers/NotificationContainer"),
  { ssr: false }
);

const Navbar = dynamic(() => import("~/components/modules/navbar/Navbar"), {
  ssr: false,
});

const Aside = dynamic(() => import("~/components/modules/aside/Aside"), {
  ssr: false,
});

const Footer = dynamic(() => import("~/components/modules/footer/Footer"), {
  ssr: false,
});

function BaseLayout({ children }: ILayoutProps) {
  const router = useRouter();

  if (
    router.pathname == "/404" ||
    router.pathname == "/reset" ||
    router.pathname == "/login" ||
    router.pathname == "/register" ||
    router.pathname == "/message"
  ) {
    return (
      <>
        <DocHead />
        <main className="bg-bg-primary-light dark:bg-bg-primary-dark">
          {children}
        </main>
      </>
    );
  } else {
    return (
      <>
        <DocHead />
        <main>
          <div className="flex min-h-screen  w-full flex-col bg-bg-primary-light dark:bg-bg-primary-dark">
            <div className="sticky top-0 z-40 w-full">
              <Navbar />
            </div>
            <div className="flex  w-full flex-row  justify-between">
              <Aside />
              {children}
            </div>
            <div>
              <NotificationContainer />
              <ScrollUpButton />
            </div>
            <Footer />
          </div>
        </main>
      </>
    );
  }
}

export default BaseLayout;
