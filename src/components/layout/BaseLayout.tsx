import { useAppSelector } from "~/lib/store/hooks";
import { AlertMessage, DocHead, ScrollUpButton } from "../common";
import { Aside, Navbar } from "../module/index";
import { ILayoutProps } from "~/@types/interface";

function BaseLayout({ children }: ILayoutProps) {
  const alerts = useAppSelector((state) => state.notification);

  return (
    <>
      <DocHead />
      <Navbar />
      <main>
        <div className="w-full flex flex-row">
          <Aside />
          {children}
        </div>
        <div className="lg:max-w-thirtythree  fixed bottom-2  right-3 ml-auto w-full px-4 md:max-w-forty">
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
      </main>
    </>
  );
}

export default BaseLayout;
