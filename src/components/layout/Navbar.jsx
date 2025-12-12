import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { Menu, X, Sun, Moon, LogIn, UserPlus } from "lucide-react";
import {
  FiHome,
  FiPackage,
  FiInfo,
  FiMail,
  FiLayout,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { gsap } from "gsap";
import { useAuth } from "../../contexts/AuthContext";



// public routes
const publicRoutes = [
  { path: "/", name: "Home", icon: <FiHome className="w-5 h-5" /> },
  {
    path: "/all-product",
    name: "All Products",
    icon: <FiPackage className="w-5 h-5" />,
  },
  { path: "/about", name: "About", icon: <FiInfo className="w-5 h-5" /> },
  { path: "/contact", name: "Contact", icon: <FiMail className="w-5 h-5" /> },
];

// private route for login user
const privateRoutes = [
  { path: "/myprofile", name: "Profile", icon: <FiUser className="w-5 h-5" /> },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FiLayout className="w-5 h-5" />,
  },
];

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  // GSAP Logo Animation on Mount
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: -50, opacity: 0, rotation: -10 },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      }
    );
  }, []);

  // Mobile Menu Animation with GSAP
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.1,
        }
      );
    }
  }, [isMobileMenuOpen]);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(localStorage.getItem("theme") === "dark");
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 text-cyan-500 font-semibold"
      : "flex items-center gap-2 text-gray-700 hover:text-green-00 font-medium transition";

  const getAvatarUrl = () => {
    if (user?.photoURL) return user.photoURL;
    const name = user?.displayName || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&bold=true`;
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
            : "bg-white/95 border-b border-cyan-300"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="GarmentGrid"
                  className="h-11 w-11 md:h-12 md:w-12 rounded-xl shadow-xl ring-4 ring-cyan-500/30 group-hover:ring-cyan-300 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-400 via-transparent to-blue-500 opacity-40 group-hover:opacity-70 blur-xl transition" />
              </div>

              {/* Text */}
              <div className="flex flex-col leading-tight">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent">
                      Garment
                    </span>
                    <span className="relative z-10 bg-gradient-to-r from-[#22d3ee] to-[#06d477] bg-clip-text text-transparent">
                      Grid
                    </span>
                    <span className="absolute inset-0 blur-xl opacity-60">
                      <span className="bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#22e7ee] bg-clip-text text-transparent">
                        GarmentGrid
                      </span>
                    </span>
                  </span>
                </h1>
                <span className="text-[10px] md:text-xs font-extrabold text-gray-600 dark:text-cyan-400 uppercase tracking-widest mt-0.5 ml-1 drop-shadow-md">
                  Production Tracker
                </span>
              </div>
            </Link>

            {/* Desktop Center Menu */}
            <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
              {publicRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={navLinkStyle}
                >
                  {route.icon}
                  <span>{route.name}</span>
                </NavLink>
              ))}

              {user &&
                privateRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={navLinkStyle}
                  >
                    {route.icon}
                    <span>{route.name}</span>
                  </NavLink>
                ))}
            </div>

            {/* Right Side: Profile / Login + Mobile Toggle */}
            <div className="flex items-center gap-4">
              {loading ? (
                <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  {/* Profile Picture */}
                  <button
                    onClick={() => navigate("/myprofile")}
                    className="relative group focus:outline-none"
                  >
                    <img
                      src={getAvatarUrl()}
                      alt="Profile"
                      className="w-11 h-11 rounded-full object-cover border-3 border-cyan-400 shadow-lg transition-all hover:scale-110 hover:border-cyan-300"
                    />
                    {/* Simple Tooltip */}
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        {user?.displayName || "My Profile"}
                      </span>
                    </div>
                  </button>

                  {/* Logout Button - Desktop Only */}
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex items-center gap-2 h-11 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition shadow-md"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-2xl hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hidden md:flex items-center gap-2 px-6 py-3  border-2 border-blue-500  font-bold rounded-lg hover:shadow-2xl hover:bg-gradient-to-r from-cyan-500 hover:to-blue-600 hover:text-white hover:border-0 transition duration-300 transform hover:scale-105"
                  >
                    <UserPlus className="w-5 h-5" />
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                {isMobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-6 py-6 space-y-4">
              {/* Public Links */}
              {publicRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-lg font-medium ${
                      isActive
                        ? "text-cyan-600"
                        : "text-gray-700 hover:text-purple-600"
                    }`
                  }
                >
                  {route.icon}
                  <span>{route.name}</span>
                </NavLink>
              ))}

              {/* Private Links */}
              {user &&
                privateRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-lg font-medium ${
                        isActive
                          ? "text-cyan-600"
                          : "text-gray-700 hover:text-purple-600"
                      }`
                    }
                  >
                    {route.icon}
                    <span>{route.name}</span>
                  </NavLink>
                ))}

              {/* Logout / Login in Mobile */}
              <div className="border-t pt-5 mt-4">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-lg font-bold text-cyan-600 hover:text-pink-700"
                  >
                    <FiLogOut className="w-5 h-5" />
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-bold text-purple-600 hover:text-purple-700"
                    >
                      <LogIn className="w-5 h-5" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-bold text-purple-600 hover:text-purple-700"
                    >
                      <UserPlus className="w-5 h-5" />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Navbar bottom spacing */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navbar;
