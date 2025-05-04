
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import VoiceAnalysisPage from "./pages/VoiceAnalysisPage";
import FaceAnalysisPage from "./pages/FaceAnalysisPage";
import ResultsPage from "./pages/ResultsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleStatusChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        toast({
          title: "You are offline",
          description: "Don't worry, EchoHealth works offline. Some features may be limited.",
          variant: "warning",
        });
      } else {
        toast({
          title: "You're back online",
          variant: "default",
        });
      }
    };
    
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/voice-analysis" element={<VoiceAnalysisPage />} />
              <Route path="/face-analysis" element={<FaceAnalysisPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
