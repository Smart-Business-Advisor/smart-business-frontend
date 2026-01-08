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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to auth changes
  useEffect(() => {
    const updateAuth = () => setLoggedIn(isLoggedIn());

    window.addEventListener("auth-change", updateAuth);
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("auth-change", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
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
      <nav className="fixed z-20 w-full px-2">
        <div
          className={`mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 ${
            isScrolled
              ? "bg-white/70 border border-gray-300 backdrop-blur-lg rounded-2xl"
              : ""
          }`}
        >
          <div className="relative flex flex-wrap items-center justify-between py-3 lg:py-4">
            
            {/* Logo */}
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link
                to="/"
                className="flex items-center gap-2 text-[#39547d] font-bold text-2xl"
              >
                <img src={logo} alt="logo" className="w-12 h-12" />
                Stratify
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                className="lg:hidden text-gray-600"
              >
                {menuState ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:block">
              <ul className="flex gap-10 font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-700 transition hover:text-blue-600
                               text-base md:text-lg lg:text-xl"
                  >
                    {link.name}
                  </Link>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="hidden lg:flex gap-3">
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-sm transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/LoginForm"
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            {menuState && (
              <div className="mt-4 w-full rounded-2xl bg-white shadow-lg lg:hidden">
                <ul className="flex flex-col items-center gap-6 py-6 font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMenuState(false)}
                      className="text-gray-700 hover:text-blue-600
                                 text-lg sm:text-xl"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {loggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="mt-4 w-3/4 rounded-lg bg-gray-800 py-3 text-white"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/LoginForm"
                      className="mt-4 w-3/4 rounded-lg bg-blue-600 py-3 text-center text-white"
                    >
                      Login
                    </Link>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
