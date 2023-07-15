import dynamic from "next/dynamic";
import React, { useState } from "react";
import Hamburger from "~/components/common/Hamburger";
import ButtonContainer from "~/components/containers/ButtonContainer";
import Logo from "~/components/elements/Logo";

const AutoSearch = dynamic(() => import("~/components/common/AutoSearch"), {
  ssr: false,
});

const NavbarWrapper = dynamic(
  () => import("~/components/modules/navbar/NavbarWrapper"),
  {
    ssr: false,
  }
);

const Navbar = () => {
  return (
    <>
      <NavbarWrapper
        hamburger={<Hamburger mobile="md" />}
        hamburgerLarge={<Hamburger breakPoint="lg" />}
        logo={<Logo text={"Ekşi"} textYellow={"Sözlük"} />}
        buttonContainer={<ButtonContainer />}
        autoSearch={<AutoSearch />}
      />
    </>
  );
};

export default Navbar;
