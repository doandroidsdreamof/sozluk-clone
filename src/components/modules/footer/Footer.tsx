const Footer = () => {
  return (
    <>
      <footer className="  bottom-0   right-0 mt-auto w-full rounded-sm border-t border-input-border-light   pr-2 shadow dark:border-input-border-dark">
        <div className="mx-auto flex w-full items-center   justify-end  p-2 pl-0 lg:pl-56">
          <ul className="mt-3 flex  flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <span className="mr-4 text-xs hover:underline md:mr-6 ">
                About
              </span>
            </li>
            <li>
              <span className="mr-4 text-xs hover:underline md:mr-6">
                Licensing
              </span>
            </li>
            <li>
              <span className="text-xs hover:underline">Contact</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
