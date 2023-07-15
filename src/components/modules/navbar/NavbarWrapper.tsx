import React from "react";

interface INavbarWrapperProps {
  hamburger?: React.ReactNode;
  hamburgerLarge?: React.ReactNode;
  autoSearch?: React.ReactNode;
  buttonContainer?: React.ReactNode;
  logo?: React.ReactNode;
}

const NavbarWrapper = ({
  hamburger,
  autoSearch,
  buttonContainer,
  logo,
  hamburgerLarge,
}: INavbarWrapperProps) => {
  return (
    <nav>
      <div className="  top-0  w-full border-b border-b-input-border-light bg-opacity-0  backdrop-blur-sm dark:border-b-input-border-dark">
        <div className="p-3 lg:pl-3">
          <div className="flex flex-col  flex-wrap justify-between gap-y-3 md:flex-row md:items-center">
            <div className="ml-0   flex w-full items-center justify-between md:w-fit md:justify-start">
              {hamburger}
              {logo}
            </div>
            {autoSearch}
            <div className="flex  w-full items-center  lg:w-fit">
              <div className="relative ml-0 flex w-full items-center justify-center  md:ml-3 lg:justify-normal ">
                <div className="relative   flex w-full flex-row items-center    justify-between   ">
                  {hamburgerLarge}
                  <div className="flex gap-x-2  ">{buttonContainer}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarWrapper;
