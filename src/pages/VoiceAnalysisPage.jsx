
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mic, Square, RotateCw, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const VoiceAnalysisPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [visualizeData, setVisualizeData] = useState([0, 0, 0, 0, 0]);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const analyzerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const navigate = useNavigate();
  
  // Set up audio context and analyzer
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analyzer for visualization
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;
      
      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        setRecordingComplete(true);
        setIsRecording(false);
        
        // Perform mock analysis
        setTimeout(() => {
          mockAnalyzeAudio();
        }, 1000);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setProgress(0);
      
      // Visualize audio
      const visualize = () => {
        const dataArray = new Uint8Array(analyzer.frequencyBinCount);
        analyzer.getByteFrequencyData(dataArray);
        
        // Get a few sample points for visualization
        const visualData = [
          dataArray[5] / 255,
          dataArray[15] / 255,
          dataArray[30] / 255,
          dataArray[60] / 255,
          dataArray[90] / 255
        ];
        
        setVisualizeData(visualData);
        animationFrameRef.current = requestAnimationFrame(visualize);
      };
      
      visualize();
      
      // Auto-stop recording after 10 seconds
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            stopRecording();
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      
      return () => clearInterval(progressInterval);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone access denied",
        description: "Please enable microphone access to use voice analysis",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      cancelAnimationFrame(animationFrameRef.current);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      setVisualizeData([0, 0, 0, 0, 0]);
    }
  };
  
  const resetRecording = () => {
    setIsRecording(false);
    setRecordingComplete(false);
    setAudioBlob(null);
    setAnalysisResult(null);
    setProgress(0);
  };
  
  const mockAnalyzeAudio = () => {
    // This is a mock analysis - in a real app, you would use TensorFlow.js to analyze the audio
    // For this demo, we'll just return some random results
    const mockResults = {
      stressLevel: Math.random() < 0.5 ? 'Low' : 'Medium',
      rhythm: Math.random() < 0.7 ? 'Normal' : 'Irregular',
      breathingPattern: Math.random() < 0.6 ? 'Normal' : 'Restricted',
      riskLevel: Math.floor(Math.random() * 40) + 10, // Value between 10-50
      confidence: Math.floor(Math.random() * 30) + 70, // Value between 70-100
    };
    
    setAnalysisResult(mockResults);
    
    // Store result in session storage for results page
    const storedResults = JSON.parse(sessionStorage.getItem('echohealth-results') || '{}');
    sessionStorage.setItem('echohealth-results', JSON.stringify({
      ...storedResults,
      voice: mockResults
    }));
  };
  
  const goToNextTest = () => {
    navigate('/face-analysis');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Voice Analysis</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Read aloud the text below clearly for 10 seconds to analyze your voice patterns.
        </p>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
          <div className="mb-6">
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Please read aloud:</h3>
            <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
              "The rainbow appeared after the storm, spreading its colors across the sky. 
              I watched as the sunlight broke through the clouds, creating a beautiful arch 
              that seemed to touch the distant mountains."
            </p>
          </div>
          
          {!recordingComplete && (
            <div className="mb-6">
              <div className="h-16 flex items-center justify-center">
                {isRecording && (
                  <div className="h-10 flex items-end space-x-1">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className="wave-bar"
                        style={{ 
                          height: `${(visualizeData[i % 5] * 40) + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              
              {isRecording && (
                <div className="mb-4">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Recording in progress... {Math.round(progress/10)}s
                  </p>
                </div>
              )}
              
              <div className="flex justify-center gap-4">
                {!isRecording ? (
                  <Button 
                    onClick={startRecording}
                    className="bg-echoTeal-600 hover:bg-echoTeal-700 text-white"
                  >
                    <Mic className="h-4 w-4 mr-2" /> Start Recording
                  </Button>
                ) : (
                  <Button 
                    onClick={stopRecording}
                    variant="destructive"
                  >
                    <Square className="h-4 w-4 mr-2" /> Stop Recording
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {recordingComplete && !analysisResult && (
            <div className="py-8 flex flex-col items-center">
              <div className="animate-spin mb-4">
                <svg className="h-8 w-8 text-echoTeal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Analyzing your voice patterns...</p>
            </div>
          )}
          
          {analysisResult && (
            <div className="animate-fadeIn">
              <h3 className="font-semibold text-lg mb-4">Analysis Results</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Stress Level</div>
                  <div className="font-medium">{analysisResult.stressLevel}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Voice Rhythm</div>
                  <div className="font-medium">{analysisResult.rhythm}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Breathing Pattern</div>
                  <div className="font-medium">{analysisResult.breathingPattern}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Confidence</div>
                  <div className="font-medium">{analysisResult.confidence}%</div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={resetRecording}
                >
                  <RotateCw className="h-4 w-4 mr-2" /> Try Again
                </Button>
                <Button
                  className="bg-echoTeal-600 hover:bg-echoTeal-700"
                  onClick={goToNextTest}
                >
                  Continue to Face Analysis <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Your voice data is processed locally and never leaves your device.
        </div>
      </div>
    </div>
  );
};

export default VoiceAnalysisPage;
