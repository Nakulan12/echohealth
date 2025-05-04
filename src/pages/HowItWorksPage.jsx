
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mic, Camera, ChevronRight, ShieldCheck, Brain, FileText } from "lucide-react";

const HowItWorksPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">How EchoHealth Works</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Learn about our technology and how we analyze health risk factors.
        </p>
        
        <div className="mb-12">
          <div className="relative">
            {/* Process Flow */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 ml-16"></div>
            
            {/* Step 1: Voice Analysis */}
            <div className="relative mb-12">
              <div className="flex">
                <div className="md:w-32 md:text-right flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-echoTeal-100 dark:bg-echoTeal-900/30 flex items-center justify-center mr-4 md:ml-auto">
                    <Mic className="h-8 w-8 text-echoTeal-600 dark:text-echoTeal-400" />
                  </div>
                </div>
                <div className="md:ml-8 flex-grow">
                  <h2 className="text-xl font-medium mb-2">Voice Analysis</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Our system analyzes subtle variations in your voice patterns including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Vocal tremor and stability</li>
                    <li>Breathing patterns and pauses</li>
                    <li>Rhythm and speech cadence</li>
                    <li>Stress indicators in voice tonality</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 2: Face Analysis */}
            <div className="relative mb-12">
              <div className="flex">
                <div className="md:w-32 md:text-right flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-echoTeal-100 dark:bg-echoTeal-900/30 flex items-center justify-center mr-4 md:ml-auto">
                    <Camera className="h-8 w-8 text-echoTeal-600 dark:text-echoTeal-400" />
                  </div>
                </div>
                <div className="md:ml-8 flex-grow">
                  <h2 className="text-xl font-medium mb-2">Face Analysis</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Our facial analysis looks for subtle indicators including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Micro-expressions and facial asymmetry</li>
                    <li>Eye movement patterns and blink rate</li>
                    <li>Facial muscle tension</li>
                    <li>Skin tone and coloration patterns</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 3: AI Processing */}
            <div className="relative mb-12">
              <div className="flex">
                <div className="md:w-32 md:text-right flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-echoTeal-100 dark:bg-echoTeal-900/30 flex items-center justify-center mr-4 md:ml-auto">
                    <Brain className="h-8 w-8 text-echoTeal-600 dark:text-echoTeal-400" />
                  </div>
                </div>
                <div className="md:ml-8 flex-grow">
                  <h2 className="text-xl font-medium mb-2">AI Analysis</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Our AI models process this data using:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>TensorFlow.js machine learning models</li>
                    <li>MediaPipe for facial tracking</li>
                    <li>Local browser-based processing</li>
                    <li>Pattern recognition against baseline data</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 4: Results */}
            <div className="relative">
              <div className="flex">
                <div className="md:w-32 md:text-right flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-echoTeal-100 dark:bg-echoTeal-900/30 flex items-center justify-center mr-4 md:ml-auto">
                    <FileText className="h-8 w-8 text-echoTeal-600 dark:text-echoTeal-400" />
                  </div>
                </div>
                <div className="md:ml-8 flex-grow">
                  <h2 className="text-xl font-medium mb-2">Results Presentation</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    We present your results with:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Clear risk assessment score</li>
                    <li>Detailed breakdown of indicators</li>
                    <li>Recommendations based on detected patterns</li>
                    <li>Option to share or download report</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-start mb-4">
            <ShieldCheck className="h-6 w-6 text-echoTeal-600 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-2">Privacy & Data Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                EchoHealth processes all data locally on your device. No voice recordings, 
                video, or images are sent to any server. Your privacy is our top priority.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h3 className="font-medium mb-2">Technical Implementation</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              <li>TensorFlow.js for on-device AI processing</li>
              <li>MediaPipe for facial landmark detection</li>
              <li>Web Speech API for voice processing</li>
              <li>PWA support for offline functionality</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-echoTeal-50 dark:bg-echoTeal-900/20 p-6 rounded-xl border border-echoTeal-100 dark:border-echoTeal-800/20 mb-8">
          <h3 className="font-medium mb-3">Important Health Notice</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            EchoHealth is an early screening tool designed to help identify potential health 
            risks, but it is not a substitute for professional medical advice, diagnosis, or 
            treatment. Always consult with a qualified healthcare provider for any health concerns.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-echoTeal-600 hover:bg-echoTeal-700"
          >
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
