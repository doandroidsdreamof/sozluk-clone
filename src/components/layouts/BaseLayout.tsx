import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { type ILayoutProps } from "@/@types/interface";
import DocHead from "../common/DocHead";
import ChatInterface from "../modules/chat/ChatInterface";

const ScrollUpButton = dynamic(
  () => import("@/components/common/ScrollUpButton"),
  { ssr: false }
);

const NotificationContainer = dynamic(
  () => import("@/components/containers/NotificationContainer"),
  { ssr: false }
);

const Navbar = dynamic(() => import("@/components/modules/navbar/Navbar"), {
  ssr: false,
});

const Aside = dynamic(() => import("@/components/modules/aside/Aside"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/modules/footer/Footer"), {
  ssr: false,
});

const BaseLayout = ({ children }: ILayoutProps) => {
  const router = useRouter();
  const noNavFooterRoutes = ["/404", "/reset", "/login", "/register"];

  return (
    <>
      <DocHead />
      <main className="bg-bg-primary-light dark:bg-bg-primary-dark">
        {noNavFooterRoutes.includes(router.pathname) ? (
          children
        ) : (
          <div className="flex min-h-screen w-full flex-col bg-bg-primary-light dark:bg-bg-primary-dark">
            <div className="sticky top-0 z-40 w-full">
              <Navbar />
            </div>
            <div className="flex w-full flex-row justify-between">
              <Aside />
              {children}
            </div>
            <ChatInterface />
            <NotificationContainer />
            <ScrollUpButton />
            <Footer />
          </div>
        )}
      </main>
    </>
  );
};

export default BaseLayout;
