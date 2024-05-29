import { type NextPage } from "next";
import NextLink from "next/link";
import {
  CLIENT_ROUTE_PATHS,
  ERROR_PAGE_CONTENT,
  LOCAL_IMAGE_ALT,
  LOCAL_IMAGE_PATHS,
} from "~/constants/staticContents";
import Image from "next/image";

const Error: NextPage = () => {
  return (
    <>
      <div className="flex h-screen items-center border-2 bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
              <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
                {ERROR_PAGE_CONTENT.ERROR_CODE}
              </p>
              <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">
                {ERROR_PAGE_CONTENT.PAGE_TITLE}
              </h1>

              <p className="mb-8 text-center text-gray-500 sm:text-left md:text-lg">
                {ERROR_PAGE_CONTENT.PAGE_DESCRIPTION}
              </p>

              <NextLink href={CLIENT_ROUTE_PATHS.HOME}>
                <button className="text-button-text hover:bg-button-light-h disabled:bg-button-light mx-auto flex items-center rounded-md bg-brandSozluk-600 p-2 px-3 font-helvetica text-sm font-bold text-typography-body-strong-light shadow-lg hover:bg-brandSozluk-700">
                  {ERROR_PAGE_CONTENT.BACK_TO_HOME}
                </button>
              </NextLink>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <Image
                src={LOCAL_IMAGE_PATHS.ERROR_IMAGE}
                loading="lazy"
                fill={true}
                alt={LOCAL_IMAGE_ALT.ERR_ALT}
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
