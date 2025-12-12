import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/Home/HomePage.jsx";
import AllProductsPage from "../pages/Products/AllProductsPage.jsx";
import AboutPage from "../pages/About/AboutPage.jsx";
import NotFoundPage from "../pages/NotFound/NotFoundPage.jsx";

import RootLayout from "../components/layout/RootLayout.jsx";
import LoginPage from "../pages/Auth/LoginPage.jsx";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <AllProductsPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <LoginPage /> },

      // Not Found
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
