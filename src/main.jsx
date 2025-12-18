import { createRoot } from "react-dom/client";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Features from "./pages/Features/Features";
import IdeaEvaluationForm from "./pages/Features/Feature1/IdeaEvaluationForm";
import IdeaSuggestionsForm from "./pages/Features/Feature2/IdeaSuggestionsForm";
import IdeaSelectionPage from "./pages/Features/Feature2/IdeaSelectionPage";
import FeasibilityAnalysisPage from "./pages/Features/Feature2/FeasibilityAnalysisPage";
import HeroSection from "./pages/Home/Hero-section";
import LoginForm from "./pages/LoginForm";
import CreateAccountForm from "./pages/CreateAccountForm";

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
      <Route path="/IdeaSuggestionsForm" element={<IdeaSuggestionsForm />} />
      <Route path="/LoginForm" element={<LoginForm />} />
      <Route path="/CreateAccountForm" element={<CreateAccountForm />} />
      <Route path="/IdeaSelectionPage" element={<IdeaSelectionPage />} />
      <Route
        path="/FeasibilityAnalysisPage"
        element={<FeasibilityAnalysisPage />}
      />
    </Routes>
  </BrowserRouter>
);
