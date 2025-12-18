import { HeroHeader } from "../../../Layout/header";
import FooterSection from "../../../Layout/FooterSection";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";


// ✅ Zod Schema
const formSchema = z.object({
  budget: z
    .string()
    .min(1, "Budget is required")
    .regex(/^[0-9]+$/, "Budget must be a number"),
  experience: z.string().min(3, "Please enter at least 3 characters"),
  location: z.string().min(2, "Location is required"),
});

export default function IdeaSuggestionsForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
  setLoading(true);

  // ⏳ Loading لمدة 2 ثانية
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 🟢 Toast Success
  toast.success("Idea submitted successfully!", {
    duration: 3000,
    style: {
      background: "#4CAF50",
      color: "#fff",
      fontWeight: "500",
    },
  });

  // 🧼 Reset inputs
  reset();

  setLoading(false);

  // 🔁 Redirect
  navigate("/IdeaSelectionPage");
};


    

  return (
    <>
      <HeroHeader />
      <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
        <div className="@container mx-auto max-w-5xl px-6">
          <div className="text-center">
            <motion.h2
              className="text-balance text-4xl font-semibold lg:text-5xl text-center pt-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Grow smarter with{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Stratify
              </span>
            </motion.h2>
            <p className="mt-4 text-gray-500">Business Idea Suggestions</p>
          </div>
        </div>

        {/* --- Form Section --- */}
        <div className="flex items-center justify-center mt-12">
          <div className="w-[90%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:max-w-2xl">
            <Toaster position="top-center" reverseOrder={false} />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {/* --- Available Budget --- */}
              <motion.div
                animate={errors.budget ? { x: [-5, 5, -5, 0] } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block mb-2 font-medium text-gray-700">
                  Available Budget (USD)
                </label>
                <input
                  type="text"
                  placeholder="Enter your budget"
                  {...register("budget")}
                  className={`w-full p-4 rounded-lg border ${
                    errors.budget ? "border-red-500" : "border-gray-300"
                  } shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1 animate-bounce">
                    {errors.budget.message}
                  </p>
                )}
              </motion.div>

              {/* --- Experience / Field --- */}
              <motion.div
                animate={errors.experience ? { x: [-5, 5, -5, 0] } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block mb-2 font-medium text-gray-700">
                  Experience / Field
                </label>
                <input
                  type="text"
                  placeholder="Enter your experience or field"
                  {...register("experience")}
                  className={`w-full p-4 rounded-lg border ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  } shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1 animate-bounce">
                    {errors.experience.message}
                  </p>
                )}
              </motion.div>

              {/* --- Location --- */}
              <motion.div
                animate={errors.location ? { x: [-5, 5, -5, 0] } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block mb-2 font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter your location"
                  {...register("location")}
                  className={`w-full p-4 rounded-lg border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1 animate-bounce">
                    {errors.location.message}
                  </p>
                )}
              </motion.div>

              {/* --- Submit Button with Icon --- */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 justify-center bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-medium px-5 py-3 rounded-xl shadow-md transition-transform duration-200 ${
                  loading ? "opacity-80 cursor-not-allowed" : "hover:scale-105"
                }`}
              >
                {loading ? (
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Ideas
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
