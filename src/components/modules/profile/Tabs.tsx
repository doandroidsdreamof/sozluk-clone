import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import TabSelector from "./TabSelector";
import { useAppDispatch } from "@/lib/store/hooks";
import { setFollowers } from "@/lib/store/reducers/followersSlice";
import { useAppSelector } from "@/lib/store/hooks";

interface ICategory {
  id: number;
  name: string;
}

interface ITabsProps {
  profilePage: boolean;
  categories: ICategory[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Tabs({ categories, profilePage }: ITabsProps) {
  const [indexEl, setIndexEl] = useState<number>(0);
  const dispatch = useAppDispatch();
  const tabState = useAppSelector((state) => state.activeFollowers.followers);

  useEffect(() => {
    if (!tabState && !profilePage) {
      setIndexEl(1);
    } else {
      setIndexEl(0);
    }
  }, [tabState]);

  function handleChange(idx: number) {
    if (!profilePage) {
      dispatch(setFollowers(idx === 0 ? "followers" : "following"));
      setIndexEl(idx);
    } else {
      setIndexEl(idx);
    }
  }

  return (
    <div
      className={
        profilePage
          ? "flex  h-full w-full flex-col pb-10"
          : "flex  w-full flex-col pb-10"
      }
    >
      <div className="relative top-0 mx-auto mt-4 w-full sm:px-0">
        <Tab.Group
          as="div"
          selectedIndex={indexEl}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <Tab.List className="flex space-x-1  rounded-xl bg-bg-secondary-light p-1 dark:bg-bg-alt-dark">
            {categories &&
              categories.map((category) => (
                <Tab
                  key={category.id}
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
                  <div>{category.name}</div>
                </Tab>
              ))}
          </Tab.List>
          <Tab.Panels className="mt-2 " />
        </Tab.Group>
        <TabSelector profilePage={profilePage} status={indexEl} />
      </div>
    </div>
  );
}

export default Tabs;
