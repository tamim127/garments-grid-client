const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">GarmentsGrid</h2>
          <p className="mt-3 text-sm">
            A smart and modern garments order & production tracking system built
            for efficiency, transparency, and growth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/booking" className="hover:text-white">
                Book Order
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Dashboard Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Dashboard</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/dashboard" className="hover:text-white">
                Overview
              </a>
            </li>
            <li>
              <a href="/dashboard/orders" className="hover:text-white">
                My Orders
              </a>
            </li>
            <li>
              <a href="/dashboard/products" className="hover:text-white">
                Manage Products
              </a>
            </li>
            <li>
              <a href="/dashboard/profile" className="hover:text-white">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@garmentsgrid.com</li>
            <li>Phone: +880 1234-567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* bottom */}
      <div className="text-center py-4 border-t border-gray-700 text-sm">
        © {new Date().getFullYear()} GarmentsGrid — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
