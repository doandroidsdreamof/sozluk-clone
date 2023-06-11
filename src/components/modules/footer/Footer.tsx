import React from "react";
import { Logo } from "~/components/elements";
import { MdWaterDrop } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="  bottom-0    right-0 mt-auto w-full rounded-sm border-t   border-input-border-light shadow dark:border-input-border-dark">
        <div className="mx-auto flex w-full items-center   justify-end  p-2 pl-0 lg:pl-56">
          <ul className="mt-3 flex  flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
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
