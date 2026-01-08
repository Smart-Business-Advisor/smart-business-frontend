import React, { useEffect, useState } from "react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { HeroHeader } from "../../../Layout/header";
import FooterSection from "../../../Layout/FooterSection";

export default function IdeaSelectionPage() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [userInput, setUserInput] = useState(null);
  const [recommendedIdeaObj, setRecommendedIdeaObj] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("ideasResult");

    if (!storedData) {
      navigate("/IdeaSuggestionsForm");
      return;
    }

    const parsed = JSON.parse(storedData);

    setUserInput(parsed.input);

    const ideasArray = parsed.ideas?.ideas || parsed.ideas || [];
    const recommendationStr =
      (parsed.ideas && parsed.ideas.recommendation) || parsed.recommendation || "";

    const mappedIdeas = ideasArray.map((idea, idx) => ({
      id: idx,
      originalData: idea,
      title: idea.title,
      description: idea.description,
      cost: `$${idea.estimatedStartingCost}`,
      profit: idea.expectedProfitPercentage,
      risk: idea.riskLevel,
      recommended:
        typeof idea.title === "string" &&
        recommendationStr &&
        (idea.title.trim().toLowerCase().includes(recommendationStr.trim().toLowerCase()) ||
          recommendationStr.trim().toLowerCase().includes(idea.title.trim().toLowerCase())),
    }));

    const recommendedIdea = mappedIdeas.find((i) => i.recommended);
    setRecommendedIdeaObj(recommendedIdea || null);

    // Reorder: put recommended in middle if it exists
    let finalIdeas = mappedIdeas;
    if (recommendedIdea && mappedIdeas.length > 1) {
      const otherIdeas = mappedIdeas.filter((i) => !i.recommended);
      finalIdeas = [
        otherIdeas[0] || recommendedIdea,
        recommendedIdea,
        otherIdeas[1] || null,
      ].filter(Boolean);
    }

    setIdeas(finalIdeas);
  }, [navigate]);

  return (
    <>
    <HeroHeader />
     <div className="w-full min-h-screen p-10 flex flex-col items-center gap-10">

      {/* USER INPUTS */}
      {userInput && (
        <div className="flex gap-4 flex-wrap justify-center w-full  mt-8 pt-8">
          <input
            disabled
            value={`Budget: $${userInput.budget}`}
            className="px-6 py-3 rounded-full border border-gray-400 w-64 text-center"
          />
          <input
            disabled
            value={`Location: ${userInput.location}`}
            className="px-6 py-3 rounded-full border border-gray-400 w-64 text-center"
          />
          <input
            disabled
            value={`Field: ${userInput.field}`}
            className="px-6 py-3 rounded-full border border-gray-400 w-64 text-center"
          />
        </div>
      )}

      {/* IDEAS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {ideas.map((idea, index) => (
          <Card
            key={index}
            className={`p-6 rounded-2xl border-2 min-h-[260px] relative transition-all flex flex-col h-full ${
              idea.recommended
                ? "border-blue-500 shadow-2xl  scale-105 md:scale-100"
                : "border-gray-400"
            }`}
          >
            {/* Recommended Badge */}
            {idea.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-2xs px-4 py-1 rounded-full shadow-lg  mt-1 sm:mt-0">
                Recommended
              </span>
            )}

            <h2 className="font-semibold text-2xl text-center mt-3">{idea.title}</h2>
            <p className="text-gray-600">Cost: {idea.cost}</p>
            <p className="text-gray-600">Profit: {idea.profit}</p>
            <p className="text-gray-600">Risk: {idea.risk}</p>

            <p className="mt-3 text-xl text-gray-800 border border-gray-400 rounded-tl-2xl rounded-br-2xl p-2 flex-1">
              {idea.description}
            </p>

            <Link
              to="/FeasibilityAnalysisPage"
              className="block w-full mt-auto"
              onClick={() => {
                localStorage.setItem(
                  "selectedIdea",
                  JSON.stringify({
                    title: idea.title,
                    description: idea.description,
                    cost: idea.cost,
                    profit: idea.profit,
                    risk: idea.risk,
                    estimatedStartingCost: idea.originalData.estimatedStartingCost,
                    expectedProfitPercentage: idea.originalData.expectedProfitPercentage,
                    riskLevel: idea.originalData.riskLevel,
                  })
                );
              }}
            >
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-500 border border-blue-500">
                Analyze Feasibility
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {/* BEST OPTION */}
      {recommendedIdeaObj && (
        <div className="bg-blue-500 text-white p-6 rounded-2xl w-full max-w-2xl">
          <h3 className="font-bold text-xl text-center">Best Option for You</h3>
          <h4 className="mt-2 text-2xl font-semibold text-center">{recommendedIdeaObj.title}</h4>
          <p className="mt-2 text-center">{recommendedIdeaObj.description}</p>
          <div className="mt-3 flex flex-col md:flex-row md:justify-center md:gap-6 text-sm md:text-base">
            
          </div>
        </div>
      )}
    </div>

    <FooterSection />
    </>
   
  );
}
