import { useAppSelector } from "~/lib/store/hooks";
import { AlertMessage, DocHead, ScrollUpButton } from "../common";
import { Aside, Navbar } from "../modules/index";
import { type ILayoutProps } from "~/@types/interface";
import { useRouter } from "next/router";

function BaseLayout({ children }: ILayoutProps) {
  const alerts = useAppSelector((state) => state.notification);
  const router = useRouter();
  if (router.pathname == "/404" || router.pathname == "/reset") {
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
          <div className=" flex min-h-screen  w-full flex-col border   bg-bg-primary-light dark:bg-bg-primary-dark">
            <Navbar />
            <div className="flex w-full  flex-row">
              <Aside />
              {children}
            </div>
            <div className="lg:max-w-thirtythree   fixed bottom-2  right-3 ml-auto w-full px-4 md:max-w-forty">
              {alerts &&
                alerts.map((items) => (
                  <AlertMessage
                    msg={items.message}
                    id={items.uid}
                    alertType={items.alertType}
                    key={items.uid}
                  />
                ))}
              <ScrollUpButton />
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default BaseLayout;
