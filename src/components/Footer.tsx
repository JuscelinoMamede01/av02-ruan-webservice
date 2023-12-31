"use client";

export const Footer = () => {
  return (
    <div>
      <footer className="bg-white rounded-lg shadow m-4 ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center space-x-4 md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Mamedev™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center  mt-3 text-sm font-medium text-gray-500  sm:mt-0">
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
