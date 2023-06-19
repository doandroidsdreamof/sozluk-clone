import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  FavoritesContainer,
  EntriesContainer,
  ImagesContainer,
} from "~/components/containers";
import { TabSelector } from "../index";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Tabs() {
  const [indexEl, setIndexEl] = useState("");
  const [categories] = useState({
    entries: [{ id: 0 }, { name: "entries" }],
    favorites: [{ id: 1 }, { name: "favorites" }],
    images: [{ id: 2 }, { name: "images" }],
  });

  function handleChange(idx: number) {
    const convertToStr = idx.toString();
    setIndexEl(convertToStr);
  }

  return (
    <div className="flex   h-full w-full flex-col pb-10">
      <div className="relative  top-0 mx-auto mt-4 w-full   sm:px-0 ">
        <Tab.Group
          as="div"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <Tab.List className="flex space-x-1  rounded-xl bg-bg-secondary-light p-1 dark:bg-bg-alt-dark ">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    " overview w-full rounded-lg  py-1.5 font-roboto text-xs font-medium leading-5 text-gray-700",
                    "ring-white ring-opacity-60 ring-offset-1 ring-offset-input-border-focus-light focus:outline-none focus:ring-2 dark:ring-offset-input-border-focus-dark",
                    selected
                      ? "bg-bg-primary-light shadow dark:bg-bg-secondary-light"
                      : "text-typography-body-light hover:bg-white/[0.12] "
                  )
                }
              >
                <div>{category}</div>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-2" />
        </Tab.Group>
        <TabSelector status={indexEl} />
      </div>
    </div>
  );
}

export default Tabs;
