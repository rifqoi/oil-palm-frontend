import React, { useContext } from "react";

import Avatar from "react-avatar";
import Logo from "../../assets/logo.png";
import { MapContext, MapContextProps } from "../../pages/MapPage";

type SidebarHeaderProps = {
  profileDropdownOpen: boolean;
  setProfileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  profileDropdownOpen,
  setProfileDropdownOpen,
}) => {
  const { user } = useContext(MapContext) as MapContextProps;
  return (
    <>
      <div className="flex w-full justify-between">
        <img className="mt-5 ml-5 h-5 text-center sm:h-10" src={Logo} alt="" />
        <div className="relative mt-5 mr-5 inline-block text-left">
          <button
            type="button"
            className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            {/* <span className="sr-only">Open user menu</span> */}
            <Avatar
              size="50"
              round={true}
              className="h-3 w-2 "
              name="Foo Bar"
            />
          </button>
          {profileDropdownOpen && (
            <div className="absolute right-0  z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-800">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{user?.name}</div>
                <div className="truncate font-medium">{user?.username}</div>
              </div>
              {/* <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"></ul> */}
              <div className="py-2">
                <a
                  href="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
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
