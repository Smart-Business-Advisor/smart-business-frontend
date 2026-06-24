import React, { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { HeroHeader } from "../../Layout/header";
import { ChevronDown } from "lucide-react"; 

export default function FAQsThree() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      id: "item-1",
      icon: "briefcase",
      question: "What is Stratify and who is it for?",
      answer:
        "Stratify is an AI-driven platform designed to help entrepreneurs, founders, and investors validate startup ideas, predict success rates, and automate financial feasibility studies all in one centralized workspace.",
    },
    {
      id: "item-2",
      icon: "lightbulb",
      question: "Can Stratify help me if I don't have a business idea yet?",
      answer:
        "Absolutely! Our AI-Based Business Idea Generation tool uses your specific constraints—such as budget limits, geographic location, and target industry—to recommend innovative and market-relevant startup ideas.",
    },
    {
      id: "item-3",
      icon: "target",
      question: "How does the Startup Success Prediction work?",
      answer:
        "Our machine learning models analyze vast amounts of historical business and market indicators. By comparing your startup's data against these patterns, we provide a data-driven probability of success to help you reduce uncertainty.",
    },
    {
      id: "item-4",
      icon: "message-circle",
      question: "Is the Financial Chatbot available 24/7?",
      answer:
        "Yes, our chatbot is powered by a pre-trained Large Language Model (LLM) specialized in financial datasets. It acts as your 24/7 advisor, ready to analyze financial statements and answer complex operational questions instantly.",
    },
    {
      id: "item-5",
      icon: "trending-up",
      question: "Does the platform provide stock market predictions?",
      answer:
        "Yes, Stratify includes a Stock Prediction feature that uses deep learning to forecast market trends based on historical data. It provides data-driven insights to help investors anticipate market volatility and minimize financial risk.",
    },
  ];

  return (
   <>
 <HeroHeader />
    <section className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen py-20 pt-32 md:py-32">

      <div className="mx-auto max-w-5xl px-4 md:px-6">
        
       
       
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:w-1/3">
            <div className="sticky top-20">
              <h2 className="mt-4 text-3xl text-gray-900 dark:text-white font-bold">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-gray-600 dark:text-white/70">
                Everything you need to know about how Stratify works and how it can help your business grow.
              </p>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="w-full space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.id}
                    
                    className={`bg-white dark:bg-white/[0.05] shadow-sm dark:shadow-lg rounded-2xl border border-gray-200 dark:border-white/20 px-5 transition-all duration-300 ease-out hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-gray-300 dark:hover:border-white/30 ${
                      isOpen ? "bg-gray-50 dark:bg-white/[0.08] shadow-md dark:shadow-xl border-gray-300 dark:border-white/30" : ""
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full flex items-center justify-between py-5 cursor-pointer text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.08] border border-gray-200 dark:border-white/10 shrink-0">
                          <DynamicIcon
                            name={item.icon}
                            className="size-5 text-gray-700 dark:text-white/80"
                          />
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium text-base">
                          {item.question}
                        </span>
                      </div>

                      <ChevronDown
                        className={`size-5 text-gray-500 dark:text-white/50 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 pb-5"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-14 pr-4">
                          <p className="text-gray-600 dark:text-white/70 leading-relaxed text-left">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
   </>
   
  );
}