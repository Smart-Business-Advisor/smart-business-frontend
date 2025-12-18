import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
 import { API_URL } from "../config/api";

/* ----- Password rules ----- */
const passwordRequirements = [
  { key: "minLength", test: (s) => s.length >= 8, msg: "At least 8 characters" },
  { key: "number", test: (s) => /\d/.test(s), msg: "At least 1 number" },
  { key: "lower", test: (s) => /[a-z]/.test(s), msg: "At least 1 lowercase letter" },
  { key: "upper", test: (s) => /[A-Z]/.test(s), msg: "At least 1 uppercase letter" },
];

/* ----- Zod schema ----- */
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((pw) => passwordRequirements.every((r) => r.test(pw)), {
      message: "Password does not meet requirements",
    }),
});

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

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

  const pwValue = watch("password", "");



const onSubmit = async (data) => {
  try {
    const res = await fetch(`${API_URL}/account/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: data.name,
        userName: data.email,
        email: data.email,
        phoneNumber: "",
        password: data.password,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.log("Register error:", errData);
      throw new Error(errData?.message || "Registration failed");
    }

    toast.success("Account created successfully!");
    navigate("/LoginForm");
  } catch {
    toast.error("Account already exists or invalid data");
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
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-28 h-28 object-contain" />
        </div>

        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-6">
          Create account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              {...register("name")}
              placeholder="Ahmed"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } shadow-md focus:ring-2 focus:ring-indigo-300`}
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
              {...register("email")}
              placeholder="helloworld@email.com"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } shadow-md focus:ring-2 focus:ring-indigo-300`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
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
                {...register("password")}
                placeholder="........"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } shadow-md focus:ring-2 focus:ring-indigo-300 pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPw ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Password requirements */}
            <div className="mt-3 text-sm text-gray-600">
              <div className="font-medium mb-1">Weak password. Must contain:</div>
              <ul className="space-y-1">
                {passwordRequirements.map((req) => {
                  const passed = req.test(pwValue || "");
                  return (
                    <li key={req.key} className="flex items-center gap-2">
                      {passed ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <X size={16} className="text-gray-400" />
                      )}
                      <span className={passed ? "text-gray-700" : "text-gray-400"}>
                        {req.msg}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              isSubmitting
                ? "bg-indigo-600/90 cursor-not-allowed"
                : "bg-[#3423FF] hover:bg-[#281bcc]"
            }`}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/LoginForm" className="font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
