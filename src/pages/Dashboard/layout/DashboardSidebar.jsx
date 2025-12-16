// src/pages/Dashboard/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../../contexts/AuthContext";


const adminRoutes = [
  { path: "manage-users", name: "Manage Users", icon: <FiUser /> },
  { path: "all-products", name: "All Products", icon: <FiPackage /> },
  { path: "all-orders", name: "All Orders", icon: <FiShoppingCart /> },
];

const managerRoutes = [
  { path: "add-product", name: "Add Product", icon: <FiPackage /> },
  { path: "my-products", name: "My Products", icon: <FiPackage /> },
  { path: "pending-orders", name: "Pending Orders", icon: <FiShoppingCart /> },
  {
    path: "approved-orders",
    name: "Approved Orders",
    icon: <FiShoppingCart />,
  },
];

const buyerRoutes = [
  { path: "my-orders", name: "My Orders", icon: <FiShoppingCart /> },
  { path: "track-order", name: "Track Order", icon: <FiSettings /> },
];

const commonRoutes = [
  { path: "profile", name: "My Profile", icon: <FiUser /> },
];

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();


  const role = user?.role || "buyer"; // Default to buyer

  const routes =
    role === "admin"
      ? adminRoutes
      : role === "manager"
      ? managerRoutes
      : buyerRoutes;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-all duration-500 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="GarmentGrid"
              className="h-10 rounded-xl"
            />
            <h2 className="text-xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {commonRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {route.icon}
              <span>{route.name}</span>
            </NavLink>
          ))}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-3 rounded-2xl text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                {route.icon}
                <span>{route.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl transition"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;
