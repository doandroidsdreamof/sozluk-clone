import dynamic from "next/dynamic";
import Hamburger from "@/components/common/Hamburger";
import ButtonContainer from "@/components/containers/ButtonContainer";
import Logo from "@/components/elements/Logo";
import { LINK_TEXT } from "@/constants/staticContents";

const AutoSearch = dynamic(() => import("@/components/common/AutoSearch"), {
  ssr: false,
});

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="top-0 w-full border-b border-b-input-border-light bg-opacity-0 backdrop-blur-sm dark:border-b-input-border-dark">
          <div className="p-3 lg:pl-3">
            <div className="flex flex-col flex-wrap justify-between gap-y-3 md:flex-row md:items-center">
              <div className="ml-0 flex w-full items-center justify-between md:w-fit md:justify-start">
                <Hamburger mobile="md" />
                <Logo
                  text={LINK_TEXT.LOGO_EKSI}
                  textYellow={LINK_TEXT.LOGO_YELLOW}
                />
              </div>
              <AutoSearch />
              <div className="flex w-full items-center lg:w-fit">
                <div className="relative ml-0 flex w-full items-center justify-center md:ml-3 lg:justify-normal">
                  <div className="relative flex w-full flex-row items-center justify-between ">
                    <Hamburger breakPoint="lg" />
                    <div className="flex gap-x-2 ">
                      <ButtonContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
