import { createRoot } from "react-dom/client";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Features from "./pages/Features/Features";
import IdeaEvaluationForm from "./pages/Features/Feature1/IdeaEvaluationForm";
import IdeaEvaluationResult from "./pages/Features/Feature1/IdeaEvaluationResult";
import IdeaEvaluationFailed from "./pages/Features/Feature1/IdeaEvaluationFailed";
import IdeaSuggestionsForm from "./pages/Features/Feature2/IdeaSuggestionsForm";
import IdeaSelectionPage from "./pages/Features/Feature2/IdeaSelectionPage";
import FeasibilityAnalysisPage from "./pages/Features/Feature2/FeasibilityAnalysisPage";
import HeroSection from "./pages/Home/Hero-section";
import LoginForm from "./pages/LoginForm";
import CreateAccountForm from "./pages/CreateAccountForm";
import AnimatedAIChat from "./pages/Features/Feature4/animated-ai-chat";
import StockPrediction from "./pages/Features/Feature5/StockPrediction";
import NotFound from "./pages/NotFound";

import Faq from "./pages/FAQ/Faq"; 
import Contact from "./pages/CONTACT/Contact";


// --- New Financial Dashboard Imports ---
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/Features/Feature3/DashboardHome";
import FinancialCalculator from "./pages/Features/Feature3/FinancialCalculator";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HeroSection />} />
     
      <Route path="/FAQ/Faq" element={<Faq />} />
      <Route path="/CONTACT/Contact" element={<Contact />} />


      {/* <Route path="/features" element={<Features />} /> */}
      <Route
        path="/features"
        element={
          <ProtectedRoute>
            <Features />
          </ProtectedRoute>
        }
      />

      <Route path="/IdeaEvaluationForm" element={<IdeaEvaluationForm />} />
      <Route path="/IdeaEvaluationResult" element={<IdeaEvaluationResult />} />
      <Route path="/IdeaEvaluationFailed" element={<IdeaEvaluationFailed />} />
      <Route path="/IdeaSuggestionsForm" element={<IdeaSuggestionsForm />} />
      <Route path="/LoginForm" element={<LoginForm />} />
      <Route path="/CreateAccountForm" element={<CreateAccountForm />} />
      <Route path="/IdeaSelectionPage" element={<IdeaSelectionPage />} />
      <Route
        path="/FeasibilityAnalysisPage"
        element={<FeasibilityAnalysisPage />}
      />
      <Route
        path="/AnimatedAIChat"
        element={<AnimatedAIChat />}
      />
      <Route
        path="/StockPrediction"
        element={<StockPrediction />}
      />

      {/* --- NEW: Financial Analysis Dashboard (Nested Routes) --- */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* 1. Default View: /dashboard (Shows the cards) */}
        <Route index element={<DashboardHome />} />

        {/* 2. Dynamic Tool View: /dashboard/analysis/break-even (Shows the calculator) */}
        <Route path="analysis/:toolId" element={<FinancialCalculator />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
);
