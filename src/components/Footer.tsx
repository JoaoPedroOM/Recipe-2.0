import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg m-4 mt-[100px]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/logo.svg"
              className="h-[50px]"
              alt="Chef House Logo"
            />
            <span className="self-center font-nunito text-2xl font-semibold whitespace-nowrap">
            Chef House
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <a href="https://github.com/JoaoPedroOM" target="_blank" className="hover:underline font-nunito">
                Contato
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2025{" "}
          <a href="/" className="hover:underline">
            Chef House
          </a>
          . Alguns direitos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
