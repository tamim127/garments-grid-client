import { useState } from "react";
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
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  photoURL: yup
    .string()
    .url("Must be a valid URL")
    .required("Photo URL is required"),
  role: yup
    .string()
    .oneOf(["buyer", "manager"], "Select a valid role")
    .required("Role is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

const RegisterPage = () => {
  const { authRegister, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      photoURL: data.photoURL,
      role: data.role,
      status: "pending",
    };

    try {
      await authRegister(data.email, data.password, data.name, data.photoURL);

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed!");
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
              className="h-16 mx-auto mb-4 rounded-xl shadow-lg"
            />
            <h1 className="text-3xl font-black bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] bg-clip-text text-transparent">
              Create Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Join GarmentGrid today
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-5 py-4 rounded-2xl border"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-5 py-4 rounded-2xl border"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Photo URL
              </label>
              <input
                type="text"
                {...register("photoURL")}
                className="w-full px-5 py-4 rounded-2xl border"
              />
              {errors.photoURL && (
                <p className="text-red-500 text-sm">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Select Role
              </label>
              <select
                {...register("role")}
                className="w-full px-5 py-4 rounded-2xl border"
              >
                <option value="">Choose One</option>
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full px-5 py-4 rounded-2xl border pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="w-full px-5 py-4 rounded-2xl border pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full py-4 bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] text-white rounded-2xl flex justify-center gap-3"
            >
              {isSubmitting || loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
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

          {/* Go to Login */}
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-500 font-bold">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
