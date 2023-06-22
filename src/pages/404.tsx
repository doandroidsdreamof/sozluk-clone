import React, { useState, useEffect } from "react";
import { type NextPage } from "next";
import NextLink from "next/link";

const Error: NextPage = () => {
  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
              <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
                Error 404
              </p>
              <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">
                Page not found
              </h1>

              <p className="mb-8 text-center text-gray-500 sm:text-left md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>

              <NextLink href={"/"}>
                <button className="text-button-text hover:bg-button-light-h disabled:bg-button-light mx-auto flex items-center rounded-md bg-brandSozluk-600 p-2  px-3 font-helvetica  text-sm  font-bold text-typography-body-strong-light shadow-lg hover:bg-brandSozluk-700">
                  Back to Homepage
                </button>
              </NextLink>
            </div>

            <div className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500"
                loading="lazy"
                alt="Photo by @heydevn"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
