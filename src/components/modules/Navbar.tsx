import React, { useState } from "react";
import { AutoSearch, Hamburger } from "../common/index";
import { Logo } from "../elements/index";
import { MdWaterDrop } from "react-icons/md";
import Button from "./button/Button";
import Link from "next/link";
import { DarkMode } from "../common/index";
import { FilterModal } from "../modals/index";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [image, setImage] = useState<string>("");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav>
        <div className="  top-0  w-full border-b border-b-input-border-light bg-opacity-0  backdrop-blur-sm dark:border-b-input-border-dark">
          <div className="p-3 lg:pl-3">
            <div className="flex flex-col justify-between gap-y-3 md:flex-row md:items-center">
              <div className="ml-0  flex w-full items-center justify-between md:w-fit md:justify-start">
                <Hamburger mobile="md" />
                <Logo
                  logo={<MdWaterDrop size={25} />}
                  text={"Ekşi"}
                  textYellow={"Sözlük"}
                />
              </div>
              <AutoSearch />

              <div className="flex items-center">
                <div className="ml-0 flex w-full items-center md:ml-3 ">
                  <div>
                    <button
                      onClick={handleClick}
                      type="button"
                      className="flex items-center overflow-hidden rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 "
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span className="sr-only">Open user menu</span>
                    </button>
                  </div>
                  <div className="relative  flex w-full flex-row items-center   justify-between   md:w-fit">
                    <Hamburger breakPoint="md" />

                    <div className="flex gap-x-2">
                      <Link href={"/login"}>
                        <Button
                          className="dark:bg-dark-600 dark:text-typography-body-dark dark:hover:bg-dark-500"
                          size="tiny"
                          type="secondary"
                        >
                          login
                        </Button>
                      </Link>
                      <Link href={"/register"}>
                        <Button size="tiny" type="primary">
                          register
                        </Button>
                      </Link>

                      <DarkMode />
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
