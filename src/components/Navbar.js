import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => closeMenu();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
     toast.success("Logout successfully");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-1 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center mt-2 space-x-2">
          <h1><b>iNotebook</b></h1>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden cursor-pointer z-50" onClick={toggleMenu}>
          <div className={`w-6 h-0.5 bg-white my-1 transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white my-1 transition ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white my-1 transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>

        {/* Navigation Items */}
        <div
          className={`flex-col lg:flex-row lg:flex ${
            isOpen ? "flex" : "hidden"
          } items-center space-x-4 mt-4 lg:mt-0 lg:space-x-4 text-center w-full lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 items-center">
            <li>
              <Link
                to="/Home"
                onClick={closeMenu}
                className={`block py-1 px-2 rounded ${
                  location.pathname === "/Home"
                    ? "bg-gray-400 opacity-30"
                    : "hover:bg-gray-400 hover:bg-opacity-30"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                onClick={closeMenu}
                className={`block py-1 px-2 rounded ${
                  location.pathname === "/About"
                    ? "bg-gray-400 opacity-30"
                    : "hover:bg-gray-400 hover:bg-opacity-60"
                }`}
              >
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <div className="flex flex-col lg:flex-row items-center gap-2 mt-2 lg:mt-0">
              <Link
                to="/Login"
                onClick={closeMenu}
                className="px-3 py-1 rounded text-white bg-gray-400/50 hover:bg-gray-400/30 transition border border-gray-300"
              >
                Login
              </Link>
              <Link
                to="/Signup"
                onClick={closeMenu}
                className="px-3 py-1 rounded text-white bg-gray-400/50 hover:bg-gray-400/30 transition border border-gray-300"
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="px-3 py-1 mt-2 border border-brand-accent text-brand-light rounded hover:bg-brand-accent hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
