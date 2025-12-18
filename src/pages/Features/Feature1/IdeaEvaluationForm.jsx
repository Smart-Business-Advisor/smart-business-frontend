import { HeroHeader } from "../../../Layout/header";
import FooterSection from "../../../Layout/FooterSection";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

import {
  BrainCircuit,
  HeartPulse,
  ShieldCheck,
  Banknote,
  Gamepad2,
  Network,
  ShoppingBag,
  GraduationCap,
  Globe,
  BarChart3,
} from "lucide-react";

// ----------------------
// ZOD SCHEMA
// ----------------------
const formSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
  region: z.string().min(1, "Region is required"),
  fundingRounds: z.string().min(1, "Funding rounds required"),
  fundingAmount: z.string().regex(/^[0-9]+$/, "Numbers only"),
  valuation: z.string().regex(/^[0-9]+$/, "Numbers only"),
  revenue: z.string().regex(/^[0-9]+$/, "Numbers only"),
  employees: z.string().regex(/^[0-9]+$/, "Numbers only"),
  marketShare: z.string().regex(/^[0-9]+$/, "Percentage only"),
  yearFounded: z.string().regex(/^[0-9]{4}$/, "Year must be 4 digits"),
});

// ----------------------
// Options with icons
// ----------------------
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
  { label: "Europe", value: "Europe" },
  { label: "North America", value: "North America" },
  { label: "Asia", value: "Asia" },
  { label: "Australia", value: "Australia" },
  { label: "South America", value: "South America" },
];

export default function IdeaEvaluationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
     watch,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));

    toast.success("Idea evaluated successfully!");

    reset();
    setLoading(false);
  };

  return (
    <>
      <HeroHeader />

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
            <Toaster position="top-center" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* -------------- SELECT INDUSTRY -------------- */}
              <div>
                <label className="block mb-2 font-medium">Industry</label>

                <select
                  {...register("industry")}
                  className={`w-full p-4 rounded-lg shadow-md border ${
                    errors.industry ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Industry</option>
                  {industryOptions.map((item) => {
                    const Icon = item.icon;
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>

                {errors.industry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.industry.message}
                  </p>
                )}

                {/* Fancy preview selected icon */}
                <div className="mt-3">
                  {industryOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <div
                        key={opt.value}
                        className={`flex items-center gap-2 transition-all duration-300 ${
                          watch("industry") === opt.value
                            ? "opacity-100"
                            : "opacity-0 h-0 overflow-hidden"
                        }`}
                      >
                        <Icon className="text-indigo-600 w-5 h-5" />
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* -------------- SELECT REGION -------------- */}
              <div>
                <label className="block mb-2 font-medium">Region</label>

                <select
                  {...register("region")}
                  className={`w-full p-4 rounded-lg shadow-md border ${
                    errors.region ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Region</option>
                  {regionOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {errors.region && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </p>
                )}
              </div>

              {/* -------------- TEXT INPUTS -------------- */}
              {[
                { label: "Funding Rounds", name: "fundingRounds" },
                { label: "Funding Amount (M USD)", name: "fundingAmount" },
                { label: "Valuation (M USD)", name: "valuation" },
                { label: "Revenue (M USD)", name: "revenue" },
                { label: "Employees", name: "employees" },
                { label: "Market Share (%)", name: "marketShare" },
                { label: "Year Founded", name: "yearFounded" },
              ].map((input) => (
                <div key={input.name}>
                  <label className="block mb-2 font-medium">
                    {input.label}
                  </label>

                  <input
                    {...register(input.name)}
                    className={`w-full p-4 rounded-lg shadow-md border ${
                      errors[input.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder={`Enter ${input.label}`}
                  />

                  {errors[input.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[input.name].message}
                    </p>
                  )}
                </div>
              ))}

              {/* -------------- SUBMIT BUTTON -------------- */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-xl shadow-md ${
                  loading ? "opacity-80" : "hover:scale-[1.02] transition"
                }`}
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
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
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
