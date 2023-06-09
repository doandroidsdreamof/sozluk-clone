import React, { useState } from "react";
import { AutoSearch, Hamburger } from "../common/index";
import { Logo } from "../elements/index";
import { MdWaterDrop } from "react-icons/md";

//BiSolidDroplet

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
        <div className="  top-0  z-50  w-full border-b border-b-input-border-light bg-opacity-0  backdrop-blur-sm dark:border-b-input-border-dark">
          <div className="p-3 lg:pl-3">
            <div className="flex items-center  justify-between">
              <div className="ml-3 flex items-center justify-start">
                <Hamburger />
                <Logo
                  logo={<MdWaterDrop size={25} />}
                  text={"Ekşi"}
                  textYellow={"Sözlük"}
                />
              </div>
              <AutoSearch />
              <div className="flex items-center">
                <div className="ml-3 flex items-center">
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
                  <div>
                    {/* <Dropdown
                      open={open}
                      handleClose={handleClose}
                      anchorEl={anchorEl}
                    /> */}
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
