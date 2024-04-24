import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <nav className="bg-white w-full z-20 top-0 left-0 border-b-4 border-red-600">
      <div className="w-full flex flex-wrap items-center justify-between p-4">
        <span></span>
        <h1 className="pl-8 md:text-xl">F1 Standings</h1>
        <div className="flex xl:order-2">
          <button
            onClick={handleNavClick}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-red-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div
          className={`justify-between ${
            isOpen
              ? "absolute bg-red-600 top-16 left-0 w-full z-10 py-10"
              : " hidden"
          } w-full xl:flex xl:w-auto xl:order-1 text-right`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col xl:p-0  xl:flex-row xl:space-x-8 xl:mt-0 xl:border-0 xl:bg-white  dark:border-gray-700">
            <li onClick={() => setIsOpen(false)}>
              <Link
                to={"/"}
                className={`block py-2 pl-3 pr-4 tracking-widest xl:font-bold ${
                  location.pathname === "/"
                    ? "font-bold text-xl xl:border-b-4 xl:pb-2 xl:border-red-600 xl:text-red-600"
                    : ""
                }  xl:bg-transparent text-base uppercase xl:text-lg xl:p-0`}
                aria-current="page"
              >
                Latest Result
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link
                to={"/driver-standings"}
                className={`block py-2 pl-3 pr-4 tracking-widest xl:font-bold ${
                  location.pathname === "/driver-standings"
                    ? "font-bold text-xl xl:border-b-4 xl:pb-2 xl:border-red-600 xl:text-red-600"
                    : ""
                }  xl:bg-transparent text-base uppercase xl:text-lg xl:p-0  `}
                aria-current="page"
              >
                Driver Standings
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link
                to={"/constructor-standings"}
                className={`block py-2 pl-3 pr-4 tracking-widest xl:font-bold ${
                  location.pathname === "/constructor-standings"
                    ? "font-bold text-xl xl:border-b-4 xl:pb-2 xl:border-red-600 xl:text-red-600"
                    : ""
                }  xl:bg-transparent text-base uppercase xl:text-lg xl:p-0 `}
              >
                Constructor Standings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
