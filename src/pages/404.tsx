import React from "react";
import { type NextPage } from "next";
import NextLink from "next/link";
import { DarkMode } from "~/components/shared";

const Error: NextPage = () => {
  return (
    <>
      <section className="bg-main-light  h-screen">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className=" mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Something&apos;s missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 ">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to
              explore on the home page.{" "}
            </p>
            <NextLink href={"/"}>
              <button className="bg-button-light">Back to Homepage</button>
            </NextLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
