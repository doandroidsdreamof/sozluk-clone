import React, { useState } from "react";
import { FormButton } from "../elements/index";
import { AiFillCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <form className="text-left" action="#">
        <div className="flex flex-col gap-4 p-1 md:p-2 ">
          <div>
            <label
              htmlFor="keywords"
              className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
            >
              Keywords
            </label>
            <input
              type="text"
              name="keywords"
              className={
                "w-full rounded border border-input-border-light bg-bg-secondary-light px-3 py-2 text-black outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark dark:text-white"
              }
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="mb-2 inline-block text-sm text-input-label-light dark:text-input-label-dark sm:text-base"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              className={
                "w-full rounded border  border-input-border-light  bg-bg-secondary-light px-3 py-2 text-black outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark dark:text-white"
              }
            />
          </div>

          <div className="flex w-full items-center ">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-40 flex items-center pl-3">
                <AiFillCalendar className="text-brandGreen-800 dark:text-typography-body-dark" />
              </div>
              <DatePicker
                placeholderText="Choose a date"
                popperPlacement="top"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                className={
                  "!dark:text-input-label-dark w-full rounded border  border-input-border-light !bg-bg-secondary-light px-3 py-2  pl-8  !text-xs  text-input-label-light outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark"
                }
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative  w-full">
              <div className="pointer-events-none  absolute inset-y-0 left-0 z-40 flex items-center pl-3 ">
                <AiFillCalendar className="text-brandGreen-800 dark:text-typography-body-dark" />
              </div>
              <DatePicker
                placeholderText="Choose a date"
                popperPlacement="top"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                className={
                  "!dark:text-input-label-dark w-full rounded border  border-input-border-light !bg-bg-secondary-light px-3 py-2  pl-8  !text-xs  text-input-label-light outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark"
                }
              />
            </div>
          </div>
          <FormButton
            text={"Search"}
            style={
              "block rounded-sm bg-brandGreen-800 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-brandGreen-700 focus-visible:ring  md:text-base"
            }
          />
        </div>
      </form>
    </>
  );
};

export default FilterForm;
