// src/pages/Products/ProductDetailsPage.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Package, DollarSign, Truck } from "lucide-react";
import toast from "react-hot-toast";
import BookingModal from "../../components/ui/BookingModal";

// ডামি প্রোডাক্ট ডাটা (পরে API থেকে আনবি)
const dummyProduct = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  description:
    "High-quality 100% cotton t-shirt with perfect fit and comfort. Available in multiple colors and sizes. Ideal for casual wear and customization.",
  category: "Shirt",
  price: 29.99,
  quantity: 150,
  minOrder: 10,
  images: [
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
  ],
  paymentOptions: ["Cash on Delivery", "Online Payment"],
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const product = dummyProduct; // পরে id দিয়ে fetch করবি

  const handleBooking = () => {
    // যদি ইউজার লগইন না থাকে তাহলে লগইন পেজে পাঠা
    // if (!user) {
    //   navigate("/login");
    //   toast.error("Please login to place an order");
    //   return;
    // }
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50/50 to-blue-100/50 dark:from-gray-900 dark:to-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
            {/* Images Section */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-2xl overflow-hidden ring-4 transition-all ${
                      selectedImage === index
                        ? "ring-cyan-500 shadow-2xl scale-105"
                        : "ring-gray-300 dark:ring-gray-700 hover:ring-cyan-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-32 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {product.description}
                </p>

                <div className="flex items-center gap-4 text-lg">
                  <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-full font-bold">
                    {product.category}
                  </span>
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Package className="w-5 h-5" />
                    Available: {product.quantity} pcs
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-cyan-500" />
                  <p className="text-5xl font-black text-cyan-600 dark:text-cyan-400">
                    ${product.price}
                  </p>
                  <span className="text-sm text-gray-500">per piece</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Truck className="w-6 h-6" />
                  <p>Minimum Order Quantity: {product.minOrder} pcs</p>
                </div>

                <div className="pt-4">
                  <p className="font-semibold mb-2">Payment Options:</p>
                  <div className="flex gap-3">
                    {product.paymentOptions.map((option) => (
                      <span
                        key={option}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              <button
                onClick={handleBooking}
                className="w-full py-6 bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#22d3ee] text-white font-bold text-xl rounded-3xl hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-500 flex items-center justify-center gap-4"
              >
                <ShoppingCart className="w-8 h-8" />
                Order / Book Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            to="/all-product"
            className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold hover:underline"
          >
            ← Back to All Products
          </Link>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetailsPage;
