
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Download, QrCode } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import QRCode from "./QRCode";

const ReportGenerator = ({ results, userName = "User" }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    // In a real implementation, we would use a library like jsPDF
    // to generate a proper PDF. For this demo, we'll simulate the process.
    
    try {
      // Simulate PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would create and download a PDF file
      toast({
        title: "Report Generated",
        description: "Your health report has been downloaded.",
      });
      
      // Simulate download by showing success toast
      console.log("Health report would be downloaded here");
      
      // Show QR code after successful generation
      setShowQR(true);
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate health report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Download Report & Health Card</h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Download a comprehensive report of your health assessment that you can share with healthcare providers.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={generatePDF} 
          disabled={isGenerating}
          className="bg-echoTeal-600 hover:bg-echoTeal-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF Report
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setShowQR(!showQR)}
          className="flex items-center"
        >
          <QrCode className="h-4 w-4 mr-2" />
          {showQR ? "Hide" : "Show"} QR Health Card
        </Button>
      </div>
      
      {showQR && <QRCode results={results} userName={userName} />}
    </div>
  );
};

export default ReportGenerator;
