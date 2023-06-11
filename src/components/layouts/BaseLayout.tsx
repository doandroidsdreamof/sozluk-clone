import { useRouter } from "next/router";
import { type ILayoutProps } from "~/@types/interface";
import { DocHead, ScrollUpButton } from "../common/index";
import { NotificationContainer } from "../containers/index";
import { Aside, Navbar, Footer } from "../modules/index";

function BaseLayout({ children }: ILayoutProps) {
  const router = useRouter();
  if (
    router.pathname == "/404" ||
    router.pathname == "/reset" ||
    router.pathname == "/login" ||
    router.pathname == "/register"
  ) {
    return (
      <>
        <DocHead />
        <main className=" bg-bg-primary-light dark:bg-bg-primary-dark">
          {children}
        </main>
      </>
    );
  } else {
    return (
      <>
        <DocHead />
        <main>
          <div className=" flex min-h-screen  w-full flex-col bg-bg-primary-light dark:bg-bg-primary-dark">
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
              <Footer />
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default BaseLayout;
