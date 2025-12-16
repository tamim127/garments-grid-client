// src/pages/Products/AllProductsPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import toast from "react-hot-toast";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 9;

  // ডামি ডাটা (পরে Firebase/Firestore থেকে আনবি)
  const dummyProducts = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      category: "Shirt",
      price: 29.99,
      quantity: 150,
      minOrder: 10,
      image: "/api/placeholder/400/500",
    },
    {
      id: 2,
      name: "Denim Jacket",
      category: "Jacket",
      price: 89.99,
      quantity: 80,
      minOrder: 5,
      image: "/api/placeholder/400/500",
    },
    {
      id: 3,
      name: "Formal Pant",
      category: "Pant",
      price: 59.99,
      quantity: 200,
      minOrder: 10,
      image: "/api/placeholder/400/500",
    },
    {
      id: 4,
      name: "Casual Hoodie",
      category: "Jacket",
      price: 49.99,
      quantity: 120,
      minOrder: 8,
      image: "/api/placeholder/400/500",
    },
    {
      id: 5,
      name: "Round Neck Tee",
      category: "Shirt",
      price: 19.99,
      quantity: 300,
      minOrder: 20,
      image: "/api/placeholder/400/500",
    },
    {
      id: 6,
      name: "Cargo Pant",
      category: "Pant",
      price: 69.99,
      quantity: 90,
      minOrder: 6,
      image: "/api/placeholder/400/500",
    },
    {
      id: 7,
      name: "Leather Belt",
      category: "Accessories",
      price: 39.99,
      quantity: 180,
      minOrder: 15,
      image: "/api/placeholder/400/500",
    },
    {
      id: 8,
      name: "Winter Scarf",
      category: "Accessories",
      price: 24.99,
      quantity: 250,
      minOrder: 25,
      image: "/api/placeholder/400/500",
    },
    {
      id: 9,
      name: "Polo Shirt",
      category: "Shirt",
      price: 34.99,
      quantity: 140,
      minOrder: 12,
      image: "/api/placeholder/400/500",
    },
    {
      id: 10,
      name: "Slim Fit Jeans",
      category: "Pant",
      price: 79.99,
      quantity: 100,
      minOrder: 5,
      image: "/api/placeholder/400/500",
    },
    {
      id: 11,
      name: "Summer Cap",
      category: "Accessories",
      price: 15.99,
      quantity: 400,
      minOrder: 30,
      image: "/api/placeholder/400/500",
    },
    {
      id: 12,
      name: "Windbreaker",
      category: "Jacket",
      price: 99.99,
      quantity: 60,
      minOrder: 4,
      image: "/api/placeholder/400/500",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Search Filter
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50/50 to-blue-100/50 dark:from-gray-900 dark:to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#22d3ee] bg-clip-text text-transparent">
            All Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
            Browse our complete collection of premium garments
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-3xl border-2 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur focus:border-cyan-500 focus:ring-4 focus:ring-cyan-400/30 transition text-lg"
            />
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-24 h-24 mx-auto text-gray-400 mb-6" />
            <p className="text-2xl text-gray-600 dark:text-gray-400">
              No products found
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500"
              >
                {/* Image Placeholder */}
                <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-t-3xl w-full h-80 flex items-center justify-center">
                  <Package className="w-20 h-20 text-gray-400" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-cyan-500 font-semibold mb-3">
                    {product.category}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-3xl font-black text-[#0ea5e9]">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Available: {product.quantity}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Min Order: {product.minOrder} pcs
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="w-full block text-center py-4 bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/40 transition transform hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-16">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-500 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;
