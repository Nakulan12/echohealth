
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, RotateCw, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const FaceAnalysisPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [captureComplete, setCaptureComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clean up function to stop camera when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access denied",
        description: "Please enable camera access to use face analysis",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    startCamera();
  }, []);
  
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress for 5 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeAnalysis();
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };
  
  const completeAnalysis = () => {
    setIsAnalyzing(false);
    setCaptureComplete(true);
    
    // In a real implementation, you would use MediaPipe or TensorFlow.js to analyze the facial features
    // For this demo, we'll use mock data
    setTimeout(() => {
      const mockResults = {
        blinkRate: Math.random() < 0.7 ? 'Normal' : 'Elevated',
        eyeMovement: Math.random() < 0.6 ? 'Regular' : 'Irregular',
        facialTension: Math.random() < 0.5 ? 'Low' : 'Moderate',
        symmetry: Math.random() < 0.8 ? 'Normal' : 'Slight asymmetry',
        riskLevel: Math.floor(Math.random() * 40) + 10, // Value between 10-50
        confidence: Math.floor(Math.random() * 20) + 75, // Value between 75-95
      };
      
      setAnalysisResult(mockResults);
      
      // Store result in session storage for results page
      const storedResults = JSON.parse(sessionStorage.getItem('echohealth-results') || '{}');
      sessionStorage.setItem('echohealth-results', JSON.stringify({
        ...storedResults,
        face: mockResults
      }));
    }, 1500);
  };
  
  const resetAnalysis = () => {
    setIsAnalyzing(false);
    setCaptureComplete(false);
    setAnalysisResult(null);
    setProgress(0);
    startCamera();
  };
  
  const viewResults = () => {
    navigate('/results');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Face Analysis</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          This analysis will capture a short video to detect subtle facial movements and expressions.
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
          {!captureComplete && (
            <div className="mb-6">
              <div className="relative mb-6 aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${isAnalyzing ? 'opacity-90' : ''}`}
                />
                
                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full h-32 w-32 border-4 border-echoTeal-500 border-opacity-70"></div>
                  </div>
                )}
              </div>
              
              {isAnalyzing && (
                <div className="mb-4">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Scanning facial features... {Math.round(progress)}%
                  </p>
                </div>
              )}
              
              <div className="flex justify-center">
                <Button 
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="bg-echoTeal-600 hover:bg-echoTeal-700 text-white"
                >
                  <Camera className="h-4 w-4 mr-2" /> 
                  {isAnalyzing ? 'Scanning...' : 'Begin Scan'}
                </Button>
              </div>
            </div>
          )}
          
          {captureComplete && !analysisResult && (
            <div className="py-8 flex flex-col items-center">
              <div className="animate-spin mb-4">
                <svg className="h-8 w-8 text-echoTeal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Analyzing facial patterns...</p>
            </div>
          )}
          
          {analysisResult && (
            <div className="animate-fadeIn">
              <h3 className="font-semibold text-lg mb-4">Analysis Results</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Blink Rate</div>
                  <div className="font-medium">{analysisResult.blinkRate}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Eye Movement</div>
                  <div className="font-medium">{analysisResult.eyeMovement}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Facial Tension</div>
                  <div className="font-medium">{analysisResult.facialTension}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Confidence</div>
                  <div className="font-medium">{analysisResult.confidence}%</div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={resetAnalysis}
                >
                  <RotateCw className="h-4 w-4 mr-2" /> Try Again
                </Button>
                <Button
                  className="bg-echoTeal-600 hover:bg-echoTeal-700"
                  onClick={viewResults}
                >
                  View Full Results <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Your facial data is processed locally and never leaves your device.
        </div>
      </div>
    </div>
  );
};

export default FaceAnalysisPage;
