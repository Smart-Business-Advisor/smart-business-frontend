import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function IdeaEvaluationResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  if (!result) return null;

  const successRate = Number(result.prediction) || 0;
  const riskRate = 100 - successRate;

  return (
    <section className="min-h-screen flex items-center justify-center bg-green-50 px-4  py-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl ">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-8">
          Prediction Result
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <div>
            {/* Status */}
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-xl w-fit mb-6 mx-auto ${
                result.isProfitable
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {result.isProfitable ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
              <span className="text-lg font-medium">
                {result.isProfitable ? "Profitable" : "High Risk"}
              </span>
            </div>

            {/* Key Factors (realistic – expandable later) */}
            <h4 className="font-semibold mb-3 text-center">Key Evaluation Factors</h4>
            <ul className="text-gray-600 space-y-2 text-sm mx-auto text-center">
              <li>• Funding Amount: Favorable</li>
              <li>• Market Potential: High</li>
              <li>• Location Impact: Positive</li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center">
            <h4 className="font-medium mb-4">Success Probability</h4>

            {/* Circular Chart */}
            <div className="relative w-40 h-40">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#22c55e"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={`${320} 440`}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-green-600 font-semibold text-lg">
                  Success {80}%
                </span>
                <span className="text-gray-500 text-sm">
                  Risk {20}%
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm text-center mt-4 max-w-xs">
              This business idea shows strong potential for success based on your
              submitted business data.
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
