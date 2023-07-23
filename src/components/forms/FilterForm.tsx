import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCalendar } from "react-icons/ai";
import { useAppDispatch } from "~/lib/store/hooks";
import Button from "../modules/button/Button";
import SelectBox from "./SelectBox";
import { setFilterData } from "~/lib/store/reducers/filterSlice";
import { api } from "~/utils/api";

// TODO extra local reducer

const FilterForm = () => {
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");
  const [selected, setSelected] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const utils = api.useContext();

  const handleSelected = (selectedValue: string) => {
    setSelected(selectedValue);
  };

  const handleClick = () => {
    dispatch(
      setFilterData({
        startDate: startDate?.toUTCString() || null,
        endDate: endDate?.toUTCString() || null,
        author: author,
        keywords: keywords,
        selected: selected || "increase",
      })
    );
    void utils.topic.getAllTopics.invalidate();
  };

  return (
    <>
      <form className="text-left">
        <div className="flex flex-col gap-3 p-1">
          <div>
            <label
              htmlFor="keywords"
              className="mb-2 inline-block text-xs  text-input-label-light dark:text-input-label-dark "
            >
              Keywords
            </label>
            <input
              type="text"
              name="keywords"
              onChange={(e) => setKeywords(e.target.value)}
              className={
                "w-full rounded border  border-input-border-light bg-bg-secondary-light px-3 py-3 text-xs text-black outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark dark:text-white"
              }
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="mb-2 inline-block text-xs text-input-label-light dark:text-input-label-dark "
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
              className={
                "w-full rounded border  border-input-border-light bg-bg-secondary-light px-3 py-3  text-xs text-black outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark dark:text-white"
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
                selected={new Date()}
                onChange={(date: Date) => setStartDate(date)}
                className={
                  "!dark:text-input-label-dark w-full  rounded border  border-input-border-light !bg-bg-secondary-light px-3 py-2.5  pl-8  !text-xs  text-input-label-light outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark"
                }
              />
            </div>
            <span className="1 mx-4 text-xs text-gray-500">to</span>
            <div className="relative  w-full">
              <div className="pointer-events-none  absolute inset-y-0 left-0 z-40 flex items-center pl-3 ">
                <AiFillCalendar className="text-brandGreen-800 dark:text-typography-body-dark" />
              </div>
              <DatePicker
                placeholderText="Choose a date"
                popperPlacement="top"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                className={
                  "!dark:text-input-label-dark w-full rounded border  border-input-border-light !bg-bg-secondary-light px-3 py-2.5  pl-8  !text-xs  text-input-label-light outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark"
                }
              />
            </div>
          </div>
          <SelectBox handleSelected={handleSelected} />
          <Button
            onClick={handleClick}
            className="block w-full rounded-sm bg-brandGreen-800 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-brandGreen-700 focus-visible:ring  md:text-base"
            size="xlarge"
            type="primary"
            htmlType="button"
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default FilterForm;
