import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import DashboardHeader from "./DashboardHeader";

import { Sidebar } from "lucide-react"; 
import { useAuth } from "../../../contexts/AuthContext";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar Wrapper */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block bg-white dark:bg-gray-800 w-64`}
      >
        {/* You can render your sidebar content here */}
        {/* Icon example if you want toggle */}
        <div
          className="p-4 cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Sidebar className="w-6 h-6 text-gray-700 dark:text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 p-4 md:p-6 lg:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
