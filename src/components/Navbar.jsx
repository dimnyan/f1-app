import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="w-full flex flex-wrap items-center justify-end p-4">
        <div className="flex md:order-2">
          <button
            onClick={handleNavClick}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          className={`items-center m-auto  justify-between ${
            isOpen
              ? "absolute bg-gray-900 top-16 left-0 w-full z-10 py-10"
              : " hidden"
          } w-full md:flex md:w-auto md:order-1 text-right`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:p-0  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to={"/"}
                className={`block py-2 pl-3 pr-4 tracking-widest md:font-bold text-white ${
                  location.pathname === "/"
                    ? "font-bold md:border-b-2 md:pb-2"
                    : ""
                }  md:bg-transparent text-base uppercase md:text-lg md:p-0  `}
                aria-current="page"
              >
                Latest Result
              </Link>
            </li>
            <li>
              <Link
                to={"/driver-standings"}
                className={`block py-2 pl-3 pr-4 tracking-widest md:font-bold text-white ${
                  location.pathname === "/driver-standings"
                    ? "font-bold md:border-b-2 md:pb-2"
                    : ""
                }  md:bg-transparent text-base uppercase md:text-lg md:p-0  `}
                aria-current="page"
              >
                Driver Standings
              </Link>
            </li>
            <li>
              <Link
                to={"/constructor-standings"}
                className={`block py-2 pl-3 pr-4 tracking-widest md:font-bold text-white ${
                  location.pathname === "/constructor-standings"
                    ? "font-bold md:border-b-2 md:pb-2"
                    : ""
                }  md:bg-transparent text-base uppercase md:text-lg md:p-0 `}
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
