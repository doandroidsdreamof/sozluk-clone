import React from "react";
import { Logo } from "~/components/elements";
import { MdWaterDrop } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className=" relative   bottom-0 right-0 w-full rounded-sm border-t   border-input-border-light shadow dark:border-input-border-dark">
        <div className="mx-auto flex w-full items-center justify-between   p-4 pl-0 lg:pl-56">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            <Logo
              footer={true}
              logo={<MdWaterDrop size={18} />}
              text={"Ekşi"}
              textYellow={"Sözlük"}
            />
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <span className="mr-4 hover:underline md:mr-6 ">About</span>
            </li>
            <li>
              <span className="mr-4 hover:underline md:mr-6">Licensing</span>
            </li>
            <li>
              <span className="hover:underline">Contact</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
