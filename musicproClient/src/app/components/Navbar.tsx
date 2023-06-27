"use client";
import { FiMenu } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navmenu() {
  const [openNav, setOpenNav] = useState(false);
  const [textButton, setTextButton] = useState(
    <Link
      href="/perfil"
      className="block cursor-default rounded bg-white py-2 text-center text-gray-900 no-underline transition hover:bg-red-800 hover:text-white hover:shadow-2xl hover:shadow-white lg:px-5"
    >
      Mi perfil
    </Link>
  );    

  return (
    <header className="border-b  bg-neutral-900 py-3 shadow-md">
      <div className="flex w-full max-w-full flex-wrap items-center justify-between px-[8%] xl:mx-auto xl:max-w-7xl ">
        {/* logo */}
        <Link
          href="/home"
          className="flex rounded-2xl bg-red-800 p-1 px-2 transition duration-300 hover:bg-amber-800 hover:shadow-2xl hover:shadow-amber-800 "
        >
          <Image src="/img/logo.png" alt="logo" width={50} height={50} />
          <p className="cursor-default py-2 text-2xl ">MusicPro</p>
        </Link>

        <FiMenu
          className="block h-6 w-6 cursor-pointer text-rose-600 lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        />

        <nav
          className={`${
            openNav ? "block" : "hidden"
          } w-full transition-opacity duration-200 ease-in lg:flex lg:w-auto lg:items-center`}
        >
          <ul className="text-base  lg:flex lg:justify-between">
            <li>
              <Link
                href="/"
                className="block cursor-default py-2 text-center transition hover:text-red-800 lg:px-5"
              >
                SamplePage
              </Link>
            </li>
            <li>
              <Link
                href="/infografias"
                className="block cursor-default py-2 text-center transition hover:text-red-800 lg:px-5"
              >
                SamplePage
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block cursor-default py-2 text-center transition hover:text-red-800 lg:px-5"
              >
                SamplePage
              </Link>
            </li>
            <li>{textButton}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
