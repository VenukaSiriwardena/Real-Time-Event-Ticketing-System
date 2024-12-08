import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-80000 shadow fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          Event Ticketing System
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex md:items-center transition-transform ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <a
            href="/"
            className="block text-white px-4 py-2 rounded-md hover:bg-purple-800 md:inline"
          >
            Home
          </a>
          <a
            href="/event"
            className="block text-white px-4 py-2 rounded-md hover:bg-purple-800 md:inline"
          >
            Customer
          </a>
          <a
            href="/add"
            className="block text-white px-4 py-2 rounded-md hover:bg-purple-800 md:inline"
          >
            Vendor
          </a>
          <a
            href="/admin"
            className="block text-white px-4 py-2 rounded-md hover:bg-purple-800 md:inline"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;