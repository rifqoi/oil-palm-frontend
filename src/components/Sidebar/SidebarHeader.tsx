import React from "react";

import Logo from "../../assets/logo.png";
import Avatar from "react-avatar";

type SidebarHeaderProps = {
  profileDropdownOpen: boolean;
  setProfileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  profileDropdownOpen,
  setProfileDropdownOpen,
}) => {
  return (
    <>
      <div className="flex justify-between w-full">
        <img className="text-center mt-5 ml-5 h-5 sm:h-10" src={Logo} alt="" />
        <div className="relative inline-block text-left mt-5 mr-5">
          <button
            type="button"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            {/* <span className="sr-only">Open user menu</span> */}
            <Avatar
              size="50"
              round={true}
              className="w-2 h-3 "
              name="Foo Bar"
            />
          </button>
          {profileDropdownOpen && (
            <div className="absolute right-0  z-10 w-44 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarHeader;
