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
import { BUTTON_TEXT } from "~/constants/staticContents";

const shareButtons = [
  {
    Component: TelegramShareButton,
    Icon: TelegramIcon,
    text: BUTTON_TEXT.SHARE_TELEGRAM,
  },
  {
    Component: WhatsappShareButton,
    Icon: WhatsappIcon,
    text: BUTTON_TEXT.SHARE_WHATSAPP,
  },
  {
    Component: TwitterShareButton,
    Icon: TwitterIcon,
    text: BUTTON_TEXT.SHARE_TWITTER,
  },
  {
    Component: FacebookShareButton,
    Icon: FacebookIcon,
    text: BUTTON_TEXT.SHARE_FACEBOOK,
  },
  {
    Component: RedditShareButton,
    Icon: RedditIcon,
    text: BUTTON_TEXT.SHARE_REDDIT,
  },
];

const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="is-active right-0 flex cursor-pointer rounded p-2 text-typography-body-light hover:bg-gray-100 hover:text-gray-900 dark:text-typography-body-strong-dark dark:hover:bg-gray-600 dark:hover:text-white">
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
        <Menu.Items className="absolute right-0 z-40 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {shareButtons.map(({ Component, Icon, text }, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Component
                    url={pathname}
                    onClick={() => setOpen(!open)}
                    className={`${
                      active ? "bg-brandGreen-800 text-white" : "text-gray-900"
                    } group flex w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                  >
                    {text} <Icon size={22} round />
                  </Component>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ShareButton;
