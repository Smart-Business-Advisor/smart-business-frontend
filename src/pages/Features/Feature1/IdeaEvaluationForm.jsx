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
} from "lucide-react";

/* ----------------------
   ZOD SCHEMA
---------------------- */
const formSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  region: z.string().min(1, "Region is required"),
  fundingRounds: z.string().min(1, "Required"),
  fundingAmount: z.string().regex(/^[0-9]+$/, "Numbers only"),
  valuation: z.string().regex(/^[0-9]+$/, "Numbers only"),
  revenue: z.string().regex(/^[0-9]+$/, "Numbers only"),
  employees: z.string().regex(/^[0-9]+$/, "Numbers only"),
 marketShare: z
  .string()
  .regex(/^[0-9]+$/, "Numbers only")
  .refine((val) => Number(val) <= 100, "Must be ≤ 100"),

 yearFounded: z
  .string()
  .regex(/^[0-9]{4}$/, "Year must be 4 digits")
  .refine(
    (val) => {
      const year = Number(val);
      return year >= 1900 && year <= new Date().getFullYear();
    },
    "Year must be between 1900 and current year"
  ),

});

/* ----------------------
   OPTIONS
---------------------- */
const industryOptions = [
  { label: "AI", value: "AI", icon: BrainCircuit },
  { label: "HealthTech", value: "HealthTech", icon: HeartPulse },
  { label: "Cybersecurity", value: "Cybersecurity", icon: ShieldCheck },
  { label: "FinTech", value: "FinTech", icon: Banknote },
  { label: "Gaming", value: "Gaming", icon: Gamepad2 },
  { label: "IOT", value: "IOT", icon: Network },
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

  /* ----------------------
     SUBMIT HANDLER
  ---------------------- */
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        industry: data.industry,
        region: data.region,
        fundingRounds: Number(data.fundingRounds),
        fundingAmount: Number(data.fundingAmount),
        valuation: Number(data.valuation),
        revenue: Number(data.revenue),
        employees: Number(data.employees),
        marketShare: Number(data.marketShare),
        yearFounded: Number(data.yearFounded),
      };

      const apiResult = await fetchPublic("/ideas/evaluate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setResult(apiResult);

      // API response structure: { prediction, isProfitable, message }
      if (apiResult.message) {
        toast.success(apiResult.message);
      } else {
        toast.success("Idea evaluated successfully!");
      }

      reset();

      // Navigate to different result pages depending on API outcome
      if (apiResult.isProfitable === false) {
        navigate("/IdeaEvaluationFailed", { state: { result: apiResult } });
      } else {
        navigate("/IdeaEvaluationResult", { state: { result: apiResult } });
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
            Fill the form below to analyze your idea
          </p>
        </div>

        <div className="flex justify-center mt-12">
          <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Industry */}
              <div>
                <label className="block mb-2 font-medium">Industry</label>
                <select
                  {...register("industry")}
                  className={`w-full p-4 rounded-lg shadow-md border ${
                    errors.industry ? "border-red-500" : "border-gray-300"
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.industry.message}
                  </p>
                )}

                {/* Selected Industry Preview */}
                {industryOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    watch("industry") === opt.value && (
                      <div key={opt.value} className="flex items-center gap-2 mt-2">
                        <Icon className="w-5 h-5 text-indigo-600" />
                        <span>{opt.label}</span>
                      </div>
                    )
                  );
                })}
              </div>

              {/* Region */}
              <div>
                <label className="block mb-2 font-medium">Region</label>
                <select
                  {...register("region")}
                  className={`w-full p-4 rounded-lg shadow-md border ${
                    errors.region ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Region</option>
                  {regionOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Inputs */}
              {[
                ["Funding Rounds", "fundingRounds"],
                ["Funding Amount (M USD)", "fundingAmount"],
                ["Valuation (M USD)", "valuation"],
                ["Revenue (M USD)", "revenue"],
                ["Employees", "employees"],
                ["Market Share (%)", "marketShare"],
                ["Year Founded", "yearFounded"],
              ].map(([label, name]) => (
                <div key={name}>
                  <label className="block mb-2 font-medium">{label}</label>
                  <input
                    {...register(name)}
                    className={`w-full p-4 rounded-lg shadow-md border ${
                      errors[name] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={`Enter ${label}`}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[name].message}
                    </p>
                  )}
                </div>
              ))}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-xl shadow-md hover:scale-[1.02] transition"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Evaluate Idea
                  </>
                )}
              </button>
            </form>

            {/* RESULT PREVIEW (optional) */}
            {/* {result && (
              <div className="mt-8 p-6 rounded-xl shadow-md bg-white text-center">
                <h3 className="text-xl font-semibold mb-2">Result</h3>
                <p className="text-gray-700">
                  Prediction: <strong>{result.prediction}</strong>
                </p>
                <p
                  className={`mt-2 font-medium ${
                    result.isProfitable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.isProfitable ? "Profitable Idea ✅" : "High Risk Idea ❌"}
                </p>
              </div>
            )} */}
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}

