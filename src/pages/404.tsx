import React from "react";
import { type NextPage } from "next";
import NextLink from "next/link";

const Error: NextPage = () => {
  return (
    <>
      <section className="flex h-screen items-center  justify-center">
        <div className="mx-auto  mb-24 max-w-screen-xl  px-4 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className=" mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Something&apos;s missing.
            </p>
            <p className="text-md mb-4 font-light text-gray-500 ">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to
              explore on the home page.{" "}
            </p>
            <NextLink href={"/"}>
              <button className="text-button-text hover:bg-button-light-h disabled:bg-button-light mx-auto flex items-center rounded-lg bg-brandSozluk-600 p-2  px-3 font-helvetica  text-sm  font-bold text-typography-body-strong-light shadow-lg hover:bg-brandSozluk-700">
                Back to Homepage
              </button>
            </NextLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
