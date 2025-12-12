// src/pages/Auth/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

// Validation schema
const schema = yup.object({
  email: yup.string().email("Valid email required").required("Email required"),
  password: yup
    .string()
    .min(6, "password atleast 6 charecters")
    .required("password required"),
});

const LoginPage = () => {
  const { login, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success("Welcome To GarmentsGrid!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.message.includes("wrong-password")
          ? "Wrong password, Please try again."
          : "Glogin failed, Please try again."
      );
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Google Login Succesfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Google Login Failed, Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-black px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-200 dark:border-cyan-800 p-8 md:p-10"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="GarmentGrid"
              className="h-16 mx-auto mb-4 rounded-xl"
            />
            <h1 className="text-3xl font-black bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Login to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-500 transition"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password")}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-500 transition pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-500 transition"
                >
                  {showPass ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full py-4 bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#22d3ee] text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="px-4 text-gray-500 dark:text-gray-400 font-medium">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="w-full py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl font-bold text-gray-800 dark:text-white hover:border-cyan-500 hover:bg-cyan-500/10 transition flex items-center justify-center gap-3"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            Didn't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-500 font-bold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
