
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Journal from "./pages/Journal";
import Triggers from "./pages/Triggers";
import Mindfulness from "./pages/Mindfulness";
import Therapy from "./pages/Therapy";
import Biometrics from "./pages/Biometrics";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/triggers" element={<Triggers />} />
          <Route path="/mindfulness" element={<Mindfulness />} />
          <Route path="/therapy" element={<Therapy />} />
          <Route path="/biometrics" element={<Biometrics />} />
          <Route path="/calendar" element={<Calendar />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
