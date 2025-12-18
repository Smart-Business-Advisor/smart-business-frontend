import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";

export const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const navigate = useNavigate();

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update login state when storage changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () => setLoggedIn(isLoggedIn());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header>
      <nav
        data-state={menuState ? "active" : ""}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={`mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 ${
            isScrolled
              ? "bg-white/70 border border-gray-600 backdrop-blur-lg rounded-2xl"
              : ""
          }`}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo + Menu Button */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                className="flex items-center space-x-2 text-[#39547d] font-bold text-[24px]"
              >
                <img src={logo} alt="logo" className="w-12 h-12" />
                Stratify
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-gray-500"
              >
                {menuState ? (
                  <X className="m-auto size-6 duration-200" />
                ) : (
                  <Menu className="m-auto size-6 duration-200" />
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-700 text-[16px] hover:text-blue-400 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </ul>
            </div>

            {/* Mobile Menu */}
            <div
              className={`${
                menuState ? "flex" : "hidden"
              } bg-white/80 text-gray mb-6 w-full flex-wrap items-center justify-center text-center space-y-8 rounded-3xl border border-blue-900 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none`}
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-600 hover:text-blue-400 block duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {loggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-medium text-sm transition-all"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/LoginForm"
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
