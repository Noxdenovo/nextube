import { Outlet } from "react-router";

import { useState, useEffect } from "react";
import logo from "./assets/logo-text.png";
export function Header({ handleMenuChange }) {
  return (
    <div className="header w-full grid grid-cols-3 justify-between items-center  bg-white pb-5 pt-5 pr-5 sticky top-0">
      <div className="flex gap-2  items-center ml-[22px]">
        <SidebarButton handleClick={handleMenuChange} />
        <div className="flex gap-1 justify-end ">
          <div className="max-w-8 ">
            <LogoImage />
          </div>
          <div className="max-w-28 ">
            <img src={logo} className="" />
          </div>
        </div>
      </div>
      <div className="search-container flex grow  ">
        <input
          className="border-2  grow  search-field  rounded-l-lg "
          placeholder="enter your search"
        />
        <button className="search-button bg-gray-200 p-2 pl-0 rounded-r-lg hover:bg-blue-600 active:bg-blue-700 min-w-10 flex justify-center">
          <SearchButton fill="#000000" />
        </button>
      </div>
      <div className="justify-self-end">
        <UserButton />
      </div>
    </div>
  );
}

//input fields for comment forms

export function MiniSideBar() {
  return (
    <>
      <div className="flex flex-col sticky top-[14%] ml-5 mr-7 justify-start min-h-[50vh] gap-3 ">
        <div className="flex flex-col items-center ">
          <HomeButton />
          <span className="text-xs">Home</span>
        </div>
        <div className="flex flex-col items-center  ">
          <ShortsButton />
          <span className="text-xs">Shorts</span>
        </div>

        <div className="flex flex-col items-center ">
          <UserButton isLabeled={true} />
          <span className="text-xs">You</span>
        </div>
      </div>
    </>
  );
}

export function FullSideBar() {
  return (
    <>
      <div className="sticky top-[14%]">
        <nav className="flex flex-col  ml-5 mr-7 justify-start min-h-[50vh] gap-3 ">
          <div className="flex flex-col gap-5 border-b border-gray-300 pb-3">
            <div className="flex items-center justify-normal ">
              <HomeButton />
              <p className="text-base ml-6">Home</p>
            </div>
            <div className="flex items-center ">
              <ShortsButton />
              <span className="text-base ml-6">Shorts</span>
            </div>
            <div className="flex items-center  ">
              <SubButton />
              <span className="text-base ml-6">Subscriptions</span>
            </div>
          </div>
          <span className="text-lg">You {">"}</span>
          <div className="flex flex-col gap-5 border-b border-gray-300 pb-3">
            <div className="flex items-center justify-normal ">
              <HistoryButton />
              <p className="text-base ml-6">History</p>
            </div>
            <div className="flex items-center justify-normal ">
              <PlaylistButton />
              <p className="text-base ml-6">Playlists</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export function Layout() {
  const [isMenuOpen, setMenu] = useState(false);
  function handleMenuChange() {
    setMenu(!isMenuOpen);
  }
  return (
    <main className="page-body w-full ">
      <div className="page-header sticky top-0 z-40">
        <Header handleMenuChange={handleMenuChange} />
      </div>

      <div className="page-sidebar sticky top-[13%] justify-self-start ">
        {isMenuOpen ? <FullSideBar /> : <MiniSideBar />}
      </div>

      <div className="page-content">
        <Outlet />
      </div>
    </main>
  );
}
export function truncString(string, desiredLength) {
  if (string.length > desiredLength) {
    let shortString = string.trim();
    shortString = shortString.slice(0, desiredLength);
    shortString = shortString.split(" ");
    shortString.pop();
    shortString.push("...");
    shortString = shortString.join(" ");
    return shortString;
  }
  return string;
}
