// src/components/ui/BookingModal.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const schema = yup.object({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  quantity: yup
    .number()
    .min(yup.ref("minOrder"), "Cannot be less than minimum order")
    .max(yup.ref("available"), "Cannot exceed available quantity")
    .required("Quantity required"),
  contactNumber: yup.string().required("Phone number required"),
  deliveryAddress: yup.string().required("Address required"),
  notes: yup.string(),
});

const BookingModal = ({ isOpen, onClose, product }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      minOrder: product.minOrder,
      available: product.quantity,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast.success(`Order placed for ${data.quantity} x ${product.name}!`);
      setIsSubmitting(false);
      reset();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  const totalPrice = product.price * (watch("quantity") || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">
              Place Your Order
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <X size={28} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Product
              </p>
              <p className="text-xl font-bold">{product.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Price per piece
              </p>
              <p className="text-xl font-bold text-cyan-600">
                ${product.price}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600"
              />
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm -mt-4">
                {errors.firstName.message}
              </p>
            )}
            {errors.lastName && (
              <p className="text-red-500 text-sm -mt-4">
                {errors.lastName.message}
              </p>
            )}

            <div>
              <label className="block font-semibold mb-2">Order Quantity</label>
              <input
                type="number"
                {...register("quantity")}
                placeholder={`Min ${product.minOrder}, Max ${product.quantity}`}
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6">
              <p className="text-2xl font-black text-center">
                Total Price:{" "}
                <span className="text-cyan-600">${totalPrice.toFixed(2)}</span>
              </p>
            </div>

            <input
              {...register("contactNumber")}
              placeholder="Contact Number"
              className="w-full px-5 py-4 rounded-2xl border"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm -mt-4">
                {errors.contactNumber.message}
              </p>
            )}

            <textarea
              {...register("deliveryAddress")}
              placeholder="Delivery Address"
              rows="4"
              className="w-full px-5 py-4 rounded-2xl border"
            />
            {errors.deliveryAddress && (
              <p className="text-red-500 text-sm -mt-4">
                {errors.deliveryAddress.message}
              </p>
            )}

            <textarea
              {...register("notes")}
              placeholder="Additional Notes (optional)"
              rows="3"
              className="w-full px-5 py-4 rounded-2xl border"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] text-white font-bold text-xl rounded-3xl hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-6 h-6" />
                  Processing Order...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingModal;
