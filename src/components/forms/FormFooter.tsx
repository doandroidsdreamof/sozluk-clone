import Link from "next/link";
import React from "react";

interface FormFooterProps {
  href: string;
  text: string;
  linkText: string;
}

const FormFooter = ({ href, text, linkText }: FormFooterProps) => {
  return (
    <div className="flex items-center justify-center  p-4 ">
      <p className="text-center text-sm text-gray-500">
        {text}
        <Link
          href={`${href}`}
          className="text-secondary-text-light  dark:text-secondary-text-dark"
        >
          <span className="ml-1 text-brandGreen-300 transition duration-100 hover:text-brandGreen-200 ">
            {linkText}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default FormFooter;
