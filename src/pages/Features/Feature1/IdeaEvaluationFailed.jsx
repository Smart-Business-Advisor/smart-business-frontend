import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function IdeaEvaluationFailed() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  if (!result) return null;

  const successRate = Number(result.prediction) || 0;
  const riskRate = 100 - successRate;

  return (
    <section className="min-h-screen flex items-center justify-center bg-red-50 px-4 mx-auto text-center py-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl  ">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-8 text-red-700">
          Prediction Result - Idea Not Viable
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <div>
            {/* Status */}
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-xl w-fit mb-6 bg-red-600 text-white mx-auto text-center`}
            >
              <XCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Not Viable</span>
            </div>

            {/* Key Factors (negative summary) */}
            <h4 className="font-semibold mb-3">Key Reasons</h4>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Insufficient funding potential</li>
              <li>• Low market interest</li>
              <li>• Poor location / fit</li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center">
            <h4 className="font-medium mb-4 text-red-700">Success Probability</h4>

            {/* Circular Chart (red) */}
            <div className="relative w-40 h-40">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#fee2e2"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#ef4444"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={`${100} 440`}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-red-600 font-semibold text-lg">Success {29}%</span>
                <span className="text-gray-500 text-sm">Risk {71}%</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm text-center mt-4 max-w-xs">
              According to the submitted data, this idea currently shows low
              potential. Consider revising the business model or exploring
              alternatives.
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4 mt-10">
         
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
