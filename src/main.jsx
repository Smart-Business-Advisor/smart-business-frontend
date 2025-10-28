import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Features from "./pages/Features/Features";
import IdeaEvaluationForm from "./pages/Features/Feature1/IdeaEvaluationForm";
import IdeaSuggestionsForm from "./pages/Features/Feature2/IdeaSuggestionsForm";
import HeroSection from "./pages/Home/Hero-section";
import Login from "./pages/Login";
 import Signup from "./pages/Signup";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<HeroSection />} />
      <Route path="/features" element={<Features />} />
      <Route path="/IdeaEvaluationForm" element={<IdeaEvaluationForm />} />
      <Route path="/IdeaSuggestionsForm" element={<IdeaSuggestionsForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
     
    </Routes>
  </BrowserRouter>
);
