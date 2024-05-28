import React from 'react';
import Link from 'next/link';

export default function HeaderComponent() {
  return (
    <div className="flex justify-between items-center h-20 w-full bg-gray-100 fixed top-0">
      <Link href="/">
        <div className="flex items-center pl-16">
          <img
            id="logo"
            src="http://localhost:4566/product/lian_logo"
            alt="logo"
            width="131"
            height="35"
          />
        </div>
      </Link>

      <nav className="flex flex-row justify-between max-w-64 min-w-32 pr-8 space-x-10">
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <Link href="/contact">
            <i className="fa-solid fa-phone fa-2x"></i>
          </Link>
        </span>
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <Link href="">
            <i className="fa-solid fa-cart-shopping fa-2x"></i>
          </Link>
        </span>
        <span className="text-gray-500 hover:text-black transition-colors duration-500">
          <Link href="/signin">
            <i className="fa-solid fa-user fa-2x"></i>
          </Link>
        </span>
      </nav>
    </div>
  );
}
