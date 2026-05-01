import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RoadmapPage from "../pages/RoadmapPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/career-roadmap" element={<RoadmapPage />} />
      </Routes>
    </BrowserRouter>
  );
}