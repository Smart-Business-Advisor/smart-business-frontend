import { HeroHeader } from "../../../Layout/header";
import FooterSection from "../../../Layout/FooterSection";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchPublic } from "../../../utils/api";

import {
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
  Banknote,
  Gamepad2,
  Network,
  ShoppingBag,
  GraduationCap,
  BarChart3,
  AlertCircle, 
  Info, 
} from "lucide-react";

/* ----------------------
   ZOD SCHEMA
---------------------- */
const currentYear = new Date().getFullYear();

const formSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  region: z.string().min(1, "Region is required"),
  
  fundingRounds: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "Funding rounds must be at least 1")
    .max(5, "Funding rounds cannot exceed 5"),

  fundingAmount: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Cannot be negative"),

  valuation: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(2.43, "Valuation must be at least 2.43 M")
    .max(4357.49, "Valuation cannot exceed 4357.49 M"),

  revenue: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0.12, "Revenue must be at least 0.12 M")
    .max(99.71, "Revenue cannot exceed 99.71 M"),

  employees: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "Must have at least 1 employee"),

  marketShare: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0.1, "Market share must be at least 0.1%")
    .max(10.0, "Market share cannot exceed 10.0%"),

  yearFounded: z.coerce
    .number({ invalid_type_error: "Must be a valid year" })
    .min(currentYear, `Launch year must be ${currentYear} or a future year`) // تمنع السنين الماضية
    .max(2050, "Year is too far in the future"),
});

/* 
   OPTIONS & FIELDS
 */
const industryOptions = [
  { label: "AI", value: "AI", icon: BrainCircuit },
  { label: "HealthTech", value: "HealthTech", icon: HeartPulse },
  { label: "Cybersecurity", value: "Cybersecurity", icon: ShieldCheck },
  { label: "FinTech", value: "FinTech", icon: Banknote },
  { label: "Gaming", value: "Gaming", icon: Gamepad2 },
 
  { label: "E-Commerce", value: "E-Commerce", icon: ShoppingBag },
  { label: "EdTech", value: "EdTech", icon: GraduationCap },
];

const regionOptions = [
  "Europe",
  "North America",
  "Asia",
  "Australia",
  "South America",
];


const inputFields = [
  { label: "Funding Rounds", name: "fundingRounds", hint: "Expected rounds of funding (Range: 1 to 5)", step: "1" },
  { label: "Funding Amount (M USD)", name: "fundingAmount", hint: "Total required funding in millions", step: "any" },
  { label: "Valuation (M USD)", name: "valuation", hint: "Estimated company value (Range: 2.43 - 4357.49 M)", step: "any" },
  { label: "Revenue (M USD)", name: "revenue", hint: "Expected annual revenue (Range: 0.12 - 99.71 M)", step: "any" },
  { label: "Employees", name: "employees", hint: "Expected number of employees", step: "1" },
  { label: "Market Share (%)", name: "marketShare", hint: "Target market share (Range: 0.1% - 10.0%)", step: "any" },
  { label: "Expected Launch Year", name: "yearFounded", hint: "Must be this year or in the future", step: "1" },
];

export default function IdeaEvaluationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* SUBMIT HANDLER */
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Zod coerce has already converted string inputs to Numbers for us
      const payload = {
        industry: data.industry,
        region: data.region,
        fundingRounds: data.fundingRounds,
        fundingAmount: data.fundingAmount,
        valuation: data.valuation,
        revenue: data.revenue,
        employees: data.employees,
        marketShare: data.marketShare,
        yearFounded: data.yearFounded,
      };

      const apiResult = await fetchPublic("/ideas/evaluate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setResult(apiResult);

      if (apiResult.message) {
        toast.success(apiResult.message);
      } else {
        toast.success("Idea evaluated successfully!");
      }

      reset();

      const prediction = Number(apiResult.prediction);
      const isSuccessful = Number.isFinite(prediction)
        ? prediction === 1
        : apiResult.isProfitable !== false;

      if (isSuccessful) {
        navigate("/IdeaEvaluationResult", { state: { result: apiResult } });
      } else {
        navigate("/IdeaEvaluationFailed", { state: { result: apiResult } });
      }
    } catch (error) {
      console.error("Error evaluating idea:", error);
      toast.error(error.message || "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroHeader />
      <Toaster position="top-center" />

      <section className="bg-zinc-50 py-16 dark:bg-transparent">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-semibold pt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Evaluate your{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Business Idea
            </span>
          </motion.h2>

          <p className="mt-4 text-gray-500">
            Fill the form below to analyze your idea based on real market constraints
          </p>
        </div>

        <div className="flex justify-center mt-12 mb-16">
          <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Industry */}
              <div>
                <label className="block mb-1.5 font-medium text-gray-800">Industry</label>
                <select
                  {...register("industry")}
                  className={`w-full p-3.5 rounded-lg border bg-gray-50/50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.industry ? "border-red-400" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {errors.industry && (
                  <div className="flex items-center gap-1.5 mt-2 text-red-600 bg-red-50 px-3 py-2 rounded-md text-sm border border-red-100">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.industry.message}</span>
                  </div>
                )}

                {/* Selected Industry Preview */}
                {industryOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    watch("industry") === opt.value && (
                      <div key={opt.value} className="flex items-center gap-2 mt-2 text-indigo-600 bg-indigo-50 w-fit px-3 py-1 rounded-full text-sm font-medium">
                        <Icon className="w-4 h-4" />
                        <span>{opt.label} Selected</span>
                      </div>
                    )
                  );
                })}
              </div>

              {/* Region */}
              <div>
                <label className="block mb-1.5 font-medium text-gray-800">Region</label>
                <select
                  {...register("region")}
                  className={`w-full p-3.5 rounded-lg border bg-gray-50/50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                    errors.region ? "border-red-400" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Region</option>
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <div className="flex items-center gap-1.5 mt-2 text-red-600 bg-red-50 px-3 py-2 rounded-md text-sm border border-red-100">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.region.message}</span>
                  </div>
                )}
              </div>

              {/* Dynamic Numeric Inputs with Hints & Alerts */}
              {inputFields.map(({ label, name, hint, step }) => (
                <div key={name} className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-medium text-gray-800">{label}</label>
                  </div>
                  
                  {/* Hint Text */}
                  <div className="flex items-center gap-1.5 mb-2 text-gray-500 text-xs">
                    <Info className="w-3.5 h-3.5" />
                    <span>{hint}</span>
                  </div>

                  <input
                    type="number"
                    step={step}
                    {...register(name)}
                    className={`w-full p-3.5 rounded-lg border bg-gray-50/50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                      errors[name] ? "border-red-400 focus:ring-red-500/20" : "border-gray-300"
                    }`}
                    placeholder={`e.g. for ${label}`}
                  />
                  
                  {/* Error Alert Box */}
                  {errors[name] && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 mt-2 text-red-600 bg-red-50 px-3 py-2 rounded-md text-sm border border-red-100"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors[name].message}</span>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all font-semibold mt-8 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Evaluating Market Data...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Evaluate Idea
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}