
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Camera, Info } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="mb-10 flex items-center justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-echoTeal-500 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">E</span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-echoTeal-400 animate-pulse-ring"></div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-echoTeal-700 to-echoTeal-500">
          AI-Powered Health Risk Checker
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Fast. Private. Free.
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mb-12">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
          >
            <div className="h-12 w-12 rounded-full bg-echoTeal-100 dark:bg-echoTeal-900/30 flex items-center justify-center mb-4 mx-auto">
              <Mic className="h-6 w-6 text-echoTeal-600 dark:text-echoTeal-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Voice Analysis</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Analyze your voice for subtle health indicators by reading a short passage.
            </p>
            <Button 
              onClick={() => navigate('/voice-analysis')}
              className="w-full bg-echoTeal-600 hover:bg-echoTeal-700 text-white"
            >
              Start Voice Test
            </Button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
          >
            <div className="h-12 w-12 rounded-full bg-echoTeal-100 dark:bg-echoTeal-900/30 flex items-center justify-center mb-4 mx-auto">
              <Camera className="h-6 w-6 text-echoTeal-600 dark:text-echoTeal-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Face Analysis</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Detect early signs through facial micro-expressions and eye movements.
            </p>
            <Button 
              onClick={() => navigate('/face-analysis')}
              className="w-full bg-echoTeal-600 hover:bg-echoTeal-700 text-white"
            >
              Start Face Test
            </Button>
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/how-it-works')}
            className="flex items-center"
          >
            <Info className="h-4 w-4 mr-2" />
            How It Works
          </Button>
          
          <div className="mt-12 p-4 bg-echoTeal-50 dark:bg-echoTeal-900/20 rounded-lg border border-echoTeal-100 dark:border-echoTeal-900/30">
            <h3 className="font-medium mb-2 text-echoTeal-900 dark:text-echoTeal-100">
              Your Privacy Matters
            </h3>
            <p className="text-sm text-echoTeal-800 dark:text-echoTeal-200">
              All processing happens locally on your device. Your data never leaves your browser.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
