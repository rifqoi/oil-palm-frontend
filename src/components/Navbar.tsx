import React from "react";
import Logo from "../assets/logo.png";

type NavbarProps = {
  center?: boolean;
  login?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ center, login }) => {
  return (
    // Navbar
    <nav className="container relative mx-auto p-6">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="pt-2">
          <a href="/">
            <img className="mr-3 h-8 sm:h-12" src={Logo} alt="" />
          </a>
        </div>

        {/* Menu Items */}
        {center && (
          <div className="hidden space-x-6 md:flex md:items-center">
            <a href="#" className="hover:text-darkGrayishBlue">
              Home
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              About
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Oil Palm
            </a>
          </div>
        )}
        {/* Button */}
        {login && (
          <a
            className="hidden rounded-full bg-brightRed p-3 px-6 pt-2 align-baseline text-white hover:bg-brightRedLight md:block"
            href="/login"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
