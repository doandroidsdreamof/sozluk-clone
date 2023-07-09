import { Menu, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

// TODO code duplicated with settings components, more generic dropdown need and loop could be useful specially at this component

const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Menu as="div" className="relative  inline-block text-left ">
      <div>
        <Menu.Button className="is-active is-active  right-0 flex cursor-pointer rounded  p-2    text-typography-body-light hover:bg-gray-100 hover:text-gray-900  dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white">
          <FiShare2 />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0  z-40 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <TelegramShareButton
                  url={pathname}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={`${
                    active ? "bg-brandGreen-800 text-white" : "text-gray-900"
                  } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                >
                  share telegram <TelegramIcon size={22} round />
                </TelegramShareButton>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <WhatsappShareButton
                  url={pathname}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={`${
                    active ? "bg-brandGreen-800 text-white" : "text-gray-900"
                  } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                >
                  share whatsapp
                  <WhatsappIcon size={22} round />
                </WhatsappShareButton>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <TwitterShareButton
                  url={pathname}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={`${
                    active ? "bg-brandGreen-800 text-white" : "text-gray-900"
                  } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                >
                  share twitter
                  <TwitterIcon size={22} round={true} />
                </TwitterShareButton>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <FacebookShareButton
                  url={pathname}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={`${
                    active ? "bg-brandGreen-800 text-white" : "text-gray-900"
                  } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                >
                  share facebook
                  <FacebookIcon size={22} round={true} />
                </FacebookShareButton>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <RedditShareButton
                  url={pathname}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={`${
                    active ? "bg-brandGreen-800 text-white" : "text-gray-900"
                  } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                >
                  share reddit
                  <RedditIcon size={22} round={true} />
                </RedditShareButton>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ShareButton;
