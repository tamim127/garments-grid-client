import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const RootLayout = ({ children }) => {
  return (
    <div className="  min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Outlet/>{children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
