// src/pages/Dashboard/layout/DashboardHeader.jsx
import { Menu } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";


const DashboardHeader = ({ setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Menu size={28} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Welcome back
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {user?.displayName || user?.email || "User"}
              </p>
            </div>
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full ring-4 ring-cyan-400/30"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
