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

  // Listen to auth changes (login / logout)
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
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            
            {/* Logo */}
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
                className="lg:hidden text-gray-500"
              >
                {menuState ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:block">
              <ul className="flex gap-8 text-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-700 hover:text-blue-500 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
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
          </div>
        </div>
      </nav>
    </header>
  );
};
