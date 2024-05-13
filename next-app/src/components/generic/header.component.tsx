import React from 'react';

export default function HeaderComponent() {
  return (
    <div className="flex justify-between items-center h-12 w-full bg-gray-100">
      <div className="flex items-center pl-16">
        <img
          id="logo"
          src="http://localhost:4566/product/lian_logo.png"
          alt="logo"
          width="131"
          height="35"
        />
      </div>

      <nav className="flex flex-row justify-between max-w-64 min-w-32 pr-8 space-x-5">
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <a href="/contact.html">
            <i className="fa-solid fa-phone fa-2x"></i>
          </a>
        </span>
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <a href="">
            <i className="fa-solid fa-cart-shopping fa-2x"></i>
          </a>
        </span>
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <a href="/login_form.html">
            <i className="fa-solid fa-user fa-2x"></i>
          </a>
        </span>
      </nav>
    </div>
  );
}
