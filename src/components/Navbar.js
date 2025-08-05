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
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        <div className="hidden lg:flex items-center justify-between">
          <h1 className="font-bold text-xl">
            <Link to="/" onClick={closeMenu}>
              iNotebook
            </Link>
          </h1>
          
          

          <div className="flex items-center space-x-6">
            <Link
              to="/Home"
              className={`block py-1 px-3 rounded ${
                location.pathname === "/Home"
                  ? "bg-gray-400 opacity-30"
                  : "hover:bg-gray-400 hover:bg-opacity-30"
              }`}
            >
              Home
            </Link>
            <Link
              to="/About"
              className={`block py-1 px-3 rounded ${
                location.pathname === "/About"
                  ? "bg-gray-400 opacity-30"
                  : "hover:bg-gray-400 hover:bg-opacity-60"
              }`}
            >
              About
            </Link>

            {!localStorage.getItem("token") ? (
              <>
                <Link
                  to="/Login"
                  className="px-3 py-1 rounded text-white bg-gray-400/50 hover:bg-gray-400/30 transition border border-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/Signup"
                  className="px-3 py-1 rounded text-white bg-gray-400/50 hover:bg-gray-400/30 transition border border-gray-300"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="px-3 py-1 border border-brand-accent text-brand-light rounded hover:bg-brand-accent hover:text-white transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <div className="flex lg:hidden justify-between items-center">
          <h1 className="font-bold text-2xl">
            <Link to="/" onClick={closeMenu}>
              iNotebook
            </Link>
          </h1>

          {/* Hamburger */}
          <div className="cursor-pointer z-50" onClick={toggleMenu}>
            <div
              className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </div>

        {/*  Mobile Dropdown Menu */}
        {isOpen && (
          <div className="flex flex-col items-center justify-center mt-6 gap-4 lg:hidden">
            <Link
              to="/Home"
              onClick={closeMenu}
              className={`block py-1 px-3 rounded ${
                location.pathname === "/Home"
                  ? "bg-gray-400 opacity-30"
                  : "hover:bg-gray-400 hover:bg-opacity-30"
              }`}
            >
              Home
            </Link>
            <Link
              to="/About"
              onClick={closeMenu}
              className={`block py-1 px-3 rounded ${
                location.pathname === "/About"
                  ? "bg-gray-400 opacity-30"
                  : "hover:bg-gray-400 hover:bg-opacity-60"
              }`}
            >
              About
            </Link>

            {!localStorage.getItem("token") ? (
              <>
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
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="px-3 py-1 border border-brand-accent text-brand-light rounded hover:bg-brand-accent hover:text-white transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
