import React from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function IdeaSelectionPage() {
  const navigate = useNavigate();
  const ideas = [
    {
      title: "Food Truck Business",
      cost: "$8,000",
      profit: "15 - 20%",
      risk: "Medium",
      description: "A mobile food service allowing flexibility and lower overheads than a traditional restaurant.",
      recommended: false,
    },
    {
      title: "Online Food Delivery Service",
      cost: "$6,000",
      profit: "15 - 20%",
      risk: "Medium",
      description: "Creating a platform to connect local restaurants with customers for fast home delivery.",
      recommended: true,
    },
    {
      title: "Food Truck Business",
      cost: "$8,000",
      profit: "15 - 20%",
      risk: "Medium",
      description: "Another mobile food option focused on a specialized cuisine niche (e.g., gourmet burgers).",
      recommended: false,
    },
  ];

  return (
    <div className="w-full min-h-screen p-10 flex flex-col items-center gap-10">
      {/* USER INPUTS */}
      <div className="flex gap-4 flex-wrap justify-center w-full">
        <input
          type="text"
          placeholder="Budget: $20,000"
          className="px-6 py-3 rounded-full border border-gray-400 w-64 text-center"
        />
        <input
          type="text"
          placeholder="Location: Cairo"
          className="px-6 py-3 rounded-full border border-gray-400 w-64 text-center"
        />
        <input
          type="text"
          placeholder="Field: Food"
          className="px-6 py-3 rounded-full border border-gray-400 w-64 text-center"
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {ideas.map((idea, index) => (
          <Card
            key={index}
            className={`p-6 rounded-2xl border-2 border-gray-400 min-h-[260px] relative transition-all flex flex-col h-full ${
              idea.recommended ? "border-green-500 shadow-2xl" : ""
            }`}
          >
            {idea.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-2xs px-4 py-1 rounded-full">
                Recommended
              </span>
            )}
            <h2 className="font-semibold text-2xl text-center mt-3">{idea.title}</h2>
            <p className="text-gray-600">Cost: {idea.cost}</p>
            <p className="text-gray-600">Profit: {idea.profit}</p>
            <p className="text-gray-600">Risk: {idea.risk}</p>
            <p className="mt-3 text-xl text-gray-800 border border-gray-400 rounded-tl-2xl rounded-br-2xl p-2 flex-1">{idea.description}</p>
            <Link to="/FeasibilityAnalysisPage" className="block w-full mt-auto mx-auto text-center"> 
              <Button className="w-full bg-green-600 text-white hover:bg-green-500 border border-green-500">
                Analyze Feasibility
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {/* BEST OPTION SECTION */}
      <div className="bg-green-500 text-white p-6 rounded-2xl w-full max-w-2xl text-center">
        <h3 className="font-bold text-xl">Best Option for You</h3>
        <p className="mt-1 font-semibold">Online Food Delivery Service</p>
        <p className="text-sm mt-2 opacity-90">
          Low startup cost, high profit potential, and increased demand.
        </p>
        
      </div>
    </div>
  );
}
