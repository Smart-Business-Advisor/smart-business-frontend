import { HeroHeader } from "../../../Layout/header";
import FooterSection from "../../../Layout/FooterSection";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { BarChart3 } from "lucide-react"; // ✅ أيقونة جديدة

// ✅ Zod Schema
const formSchema = z.object({
  industry: z.string().min(2, "Industry is required"),
  fundingRounds: z.string().min(1, "Funding Rounds are required"),
  fundingAmount: z
    .string()
    .regex(/^[0-9]+$/, "Funding Amount must be a positive number")
    .min(1, "Funding Amount is required"),
  valuation: z
    .string()
    .regex(/^[0-9]+$/, "Valuation must be a positive number")
    .min(1, "Valuation is required"),
  revenue: z
    .string()
    .regex(/^[0-9]+$/, "Revenue must be a positive number")
    .min(1, "Revenue is required"),
  employees: z
    .string()
    .regex(/^[0-9]+$/, "Employees must be a positive number")
    .min(1, "Employees count is required"),
  marketShare: z
    .string()
    .regex(/^[0-9]+$/, "Market Share must be a percentage number")
    .min(1, "Market Share is required"),
  yearFounded: z
    .string()
    .regex(/^[0-9]{4}$/, "Enter a valid year")
    .min(4, "Year Founded is required"),
  region: z.string().min(2, "Region is required"),
});

export default function IdeaEvaluationForm() {
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Idea evaluated successfully!", {
      duration: 3000,
      style: {
        background: "#4CAF50",
        color: "#fff",
        fontWeight: "500",
      },
    });

    reset();
    setLoading(false);
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
              Evaluate your{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Business Idea
              </span>
            </motion.h2>
            <p className="mt-4 text-gray-500">
              Fill in the details below to analyze your idea
            </p>
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
              {[
                { label: "Industry", name: "industry", type: "text" },
                { label: "Funding Rounds", name: "fundingRounds", type: "text" },
                { label: "Funding Amount (M USD)", name: "fundingAmount", type: "number" },
                { label: "Valuation (M USD)", name: "valuation", type: "number" },
                { label: "Revenue (M USD)", name: "revenue", type: "number" },
                { label: "Employees", name: "employees", type: "number" },
                { label: "Market Share (%)", name: "marketShare", type: "number" },
                { label: "Year Founded", name: "yearFounded", type: "number" },
                { label: "Region", name: "region", type: "text" },
              ].map((input) => (
                <motion.div
                  key={input.name}
                  animate={errors[input.name] ? { x: [-5, 5, -5, 0] } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block mb-2 font-medium text-gray-700">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    placeholder={`Enter ${input.label}`}
                    {...register(input.name)}
                    className={`w-full p-4 rounded-lg border ${
                      errors[input.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    } shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                  />
                  {errors[input.name] && (
                    <p className="text-red-500 text-sm mt-1 animate-bounce">
                      {errors[input.name].message}
                    </p>
                  )}
                </motion.div>
              ))}

              {/* --- Submit Button --- */}
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
                    Evaluating...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Evaluate Idea
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
