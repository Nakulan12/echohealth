
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConsentModal from "./ConsentModal";
import ChatAssistant from "./ChatAssistant/ChatAssistant";
import PanicButton from "./EmergencyAssistant/PanicButton";
import { toast } from "@/components/ui/use-toast";

const Layout = () => {
  const [hasConsented, setHasConsented] = useState(false);
  const [results, setResults] = useState(null);
  
  useEffect(() => {
    // Check if user has previously consented
    const consent = localStorage.getItem("echohealth-consent");
    if (consent === "true") {
      setHasConsented(true);
    }
    
    // Load the latest results if available
    const storedResults = JSON.parse(sessionStorage.getItem('echohealth-results') || '{}');
    if (storedResults.voice || storedResults.face) {
      setResults(storedResults);
    }
    
    // Apply accessibility classes
    const htmlEl = document.documentElement;
    htmlEl.classList.add("text-normal", "font-default");
    
    // Add CSS for accessibility text sizes
    const style = document.createElement('style');
    style.textContent = `
      .text-normal { font-size: 100%; }
      .text-large { font-size: 120%; }
      .text-xl { font-size: 150%; }
      .font-default { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .font-dyslexic { font-family: 'Open Sans', 'Comic Sans MS', cursive, sans-serif; letter-spacing: 0.05em; word-spacing: 0.1em; }
      .font-contrast { font-weight: 500; letter-spacing: 0.025em; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const handleConsent = () => {
    localStorage.setItem("echohealth-consent", "true");
    setHasConsented(true);
    
    toast({
      title: "Welcome to EchoHealth",
      description: "Your data is processed locally and never leaves your device.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {!hasConsented && (
        <ConsentModal onConsent={handleConsent} />
      )}
      
      {/* Fixed position components */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="w-32">
          <PanicButton />
        </div>
      </div>
      
      <ChatAssistant resultsData={results} />
    </div>
  );
};

export default Layout;
