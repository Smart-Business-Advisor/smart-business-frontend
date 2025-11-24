import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Link } from "react-router-dom";


/* ----- Zod validation schema ----- */
const passwordRequirements = [
  {
    key: "minLength",
    test: (s) => s.length >= 8,
    msg: "At least 8 characters",
  },
  { key: "number", test: (s) => /\d/.test(s), msg: "At least 1 number" },
  {
    key: "lower",
    test: (s) => /[a-z]/.test(s),
    msg: "At least 1 lowercase letter",
  },
  {
    key: "upper",
    test: (s) => /[A-Z]/.test(s),
    msg: "At least 1 uppercase letter",
  },
];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((pw) => passwordRequirements.every((r) => r.test(pw)), {
      message: "Password does not meet requirements",
    }),
});

export default function CreateAccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const [showPw, setShowPw] = useState(false);

  // watch password to show requirement checks in real-time
  const pwValue = watch("password", "");

  const onSubmit = async (data) => {
    // loading handled by isSubmitting from react-hook-form
    // Simulate API call (replace with real API later)
    try {
      await new Promise((res) => setTimeout(res, 1800));
      toast.success("Account created successfully!", {
        duration: 3000,
        style: { background: "#4CAF50", color: "#fff", fontWeight: 500 },
      });
      // ready to integrate API: send `data` to your server here
      reset();
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 md:p-10"
      >
        {/* --- Logo --- */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-28 h-28 object-contain" />
        </div>

        {/* --- Heading --- */}
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-6">
          Create account
        </h2>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Ahmed"
              {...register("name")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="helloworld@email.com"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="........"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-12`}
              />

              {/* eye icon */}
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* password requirements block */}
            <div className="mt-3 text-sm text-gray-600">
              <div className="font-medium text-gray-700 mb-1">
                Weak password. Must contain:
              </div>

              <ul className="space-y-1">
                {passwordRequirements.map((req) => {
                  const passed = req.test(pwValue || "");
                  return (
                    <li key={req.key} className="flex items-center gap-2">
                      <span
                        className={`${passed ? "text-green-600" : "text-gray-400"}`}
                      >
                        {passed ? (
                          <Check size={16} className="inline" />
                        ) : (
                          <X size={16} className="inline" />
                        )}
                      </span>

                      <span
                        className={`${passed ? "text-gray-700" : "text-gray-400"} text-sm`}
                      >
                        {req.msg}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {errors.password && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* --- Submit Button (with spinner) --- */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg text-white font-semibold transition ${
                isSubmitting
                  ? "bg-indigo-600/90 cursor-not-allowed"
                  : "bg-[#3423FF] hover:bg-[#281bcc]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    ></path>
                  </svg>
                  Signing up...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>

        {/* --- footer --- */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/LoginForm"
            className="font-medium text-gray-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
