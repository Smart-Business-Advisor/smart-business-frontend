import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Features from "./pages/Features/Features";
import IdeaEvaluationForm from "./pages/Features/Feature1/IdeaEvaluationForm";
import IdeaSuggestionsForm from "./pages/Features/Feature2/IdeaSuggestionsForm";
import HeroSection from "./pages/Home/Hero-section";
import LoginForm from "./pages/LoginForm";
 import CreateAccountForm from "./pages/CreateAccountForm";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<HeroSection />} />
      <Route path="/features" element={<Features />} />
      <Route path="/IdeaEvaluationForm" element={<IdeaEvaluationForm />} />
      <Route path="/IdeaSuggestionsForm" element={<IdeaSuggestionsForm />} />
      <Route path="/LoginForm" element={<LoginForm />} />
      <Route path="/CreateAccountForm" element={<CreateAccountForm />} />
     
    </Routes>
  </BrowserRouter>
);
