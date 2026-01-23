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

// --- New Financial Dashboard Imports ---
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/Features/Feature3/DashboardHome";
import FinancialCalculator from "./pages/Features/Feature3/FinancialCalculator";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HeroSection />} />
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


    </Routes>
  </BrowserRouter>
);
