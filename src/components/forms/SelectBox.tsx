import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const selectOptions = ["increase", "decrease", "alphabetical"];

interface ISelectBox {
  handleSelected: (param: string) => void;
}

export default function SelectBox({ handleSelected }: ISelectBox) {
  const [selected, setSelected] = useState(selectOptions[0]);

  return (
    <div className="relative ">
      <Listbox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          handleSelected(value);
        }}
      >
        <div className="z relative mt-1">
          <Listbox.Button className="w-full rounded border border-input-border-light  bg-bg-secondary-light px-3  py-3 text-left text-xs text-black outline-none ring-brandGreen-500 transition duration-100 focus:ring-1 dark:border-input-border-dark dark:bg-bg-secondary-dark dark:text-white">
            <span className="block truncate">{selected}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white  py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-bg-alt-dark sm:text-sm">
              {selectOptions.map((selectOptions, selectOptionsIdx) => (
                <Listbox.Option
                  key={selectOptionsIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-4 text-left ${
                      active
                        ? "bg-brandGreen-800"
                        : "text-gray-900 dark:text-typography-body-dark"
                    }`
                  }
                  value={selectOptions}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {selectOptions}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
