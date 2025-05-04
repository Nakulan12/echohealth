
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Share2, FileText, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import ReportGenerator from "../components/ReportGenerator/ReportGenerator";
import AIHealthTips from "../components/HealthTips/AIHealthTips";
import SymptomJournal from "../components/SymptomTracker/SymptomJournal";
import FamilyProfiles from "../components/FamilyMode/FamilyProfiles";

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState("Low");
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedResults = JSON.parse(sessionStorage.getItem('echohealth-results') || '{}');
    
    if (!storedResults.voice && !storedResults.face) {
      // No results found, redirect to home
      navigate('/');
      return;
    }
    
    setResults(storedResults);
    
    // Calculate combined risk score
    let voiceRisk = storedResults.voice?.riskLevel || 0;
    let faceRisk = storedResults.face?.riskLevel || 0;
    
    // If we have both scores, average them, otherwise use the one we have
    let combinedScore;
    if (voiceRisk && faceRisk) {
      combinedScore = Math.round((voiceRisk + faceRisk) / 2);
    } else {
      combinedScore = voiceRisk || faceRisk;
    }
    
    setScore(combinedScore);
    
    // Determine risk level
    if (combinedScore < 20) {
      setRiskLevel("Low");
    } else if (combinedScore < 40) {
      setRiskLevel("Moderate");
    } else {
      setRiskLevel("High");
    }
  }, [navigate]);
  
  const getRiskColor = () => {
    switch (riskLevel) {
      case "Low":
        return "#10B981"; // Green
      case "Moderate":
        return "#F59E0B"; // Amber/orange
      case "High":
        return "#EF4444"; // Red
      default:
        return "#10B981";
    }
  };
  
  const getAdvice = () => {
    switch (riskLevel) {
      case "Low":
        return "Your results suggest low risk indicators. Continue healthy habits and regular check-ups.";
      case "Moderate":
        return "Some potential indicators detected. Consider following up with a healthcare professional.";
      case "High":
        return "Several risk indicators detected. We recommend consulting with a healthcare professional soon.";
      default:
        return "Keep up with regular health check-ups.";
    }
  };
  
  const resetTests = () => {
    sessionStorage.removeItem('echohealth-results');
    navigate('/');
  };
  
  if (!results) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin mb-4 mx-auto">
          <svg className="h-8 w-8 text-echoTeal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Loading results...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Your Health Assessment</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
          Analysis completed on {new Date().toLocaleDateString()}
        </p>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-6 gap-2">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "bg-echoTeal-600 hover:bg-echoTeal-700" : ""}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "tips" ? "default" : "outline"}
            onClick={() => setActiveTab("tips")}
            className={activeTab === "tips" ? "bg-echoTeal-600 hover:bg-echoTeal-700" : ""}
          >
            Health Tips
          </Button>
          <Button
            variant={activeTab === "journal" ? "default" : "outline"}
            onClick={() => setActiveTab("journal")}
            className={activeTab === "journal" ? "bg-echoTeal-600 hover:bg-echoTeal-700" : ""}
          >
            Symptom Journal
          </Button>
          <Button
            variant={activeTab === "family" ? "default" : "outline"}
            onClick={() => setActiveTab("family")}
            className={activeTab === "family" ? "bg-echoTeal-600 hover:bg-echoTeal-700" : ""}
          >
            Family Profiles
          </Button>
        </div>
        
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 col-span-1 md:col-span-2">
                <h2 className="font-semibold text-lg mb-4">Risk Assessment</h2>
                
                <div className="flex flex-col md:flex-row items-center mb-6">
                  <div className="w-40 h-40 mb-4 md:mb-0 md:mr-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Risk", value: score },
                            { name: "Safe", value: 100 - score }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={36}
                          outerRadius={50}
                          startAngle={180}
                          endAngle={0}
                          paddingAngle={0}
                          dataKey="value"
                        >
                          <Cell fill={getRiskColor()} />
                          <Cell fill="#E5E7EB" />
                          <Label
                            content={(props) => {
                              return (
                                <text
                                  x={props.viewBox.cx}
                                  y={props.viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  className="font-bold text-lg"
                                >
                                  {score}
                                </text>
                              );
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      riskLevel === "Low" ? "bg-green-100 text-green-800" :
                      riskLevel === "Moderate" ? "bg-amber-100 text-amber-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {riskLevel} Risk
                    </div>
                    <h3 className="text-lg font-medium mt-2 mb-1">Health Risk Score: {score}/100</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      This score is calculated based on analysis of your voice and facial patterns.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <p className="text-gray-600 dark:text-gray-300">{getAdvice()}</p>
                </div>
                
                <ReportGenerator results={results} />
              </Card>
              
              <Card className="p-6">
                <h2 className="font-semibold text-lg mb-4">Analysis Details</h2>
                
                {results.voice && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Voice Analysis</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Stress Level:</span>
                        <span className="font-medium">{results.voice.stressLevel}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Rhythm:</span>
                        <span className="font-medium">{results.voice.rhythm}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Breathing:</span>
                        <span className="font-medium">{results.voice.breathingPattern}</span>
                      </li>
                    </ul>
                  </div>
                )}
                
                {results.face && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Face Analysis</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Blink Rate:</span>
                        <span className="font-medium">{results.face.blinkRate}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Eye Movement:</span>
                        <span className="font-medium">{results.face.eyeMovement}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Facial Tension:</span>
                        <span className="font-medium">{results.face.facialTension}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </Card>
            </div>
          </>
        )}
        
        {/* Health Tips Tab */}
        {activeTab === "tips" && (
          <div className="mb-8">
            <AIHealthTips results={results} />
          </div>
        )}
        
        {/* Symptom Journal Tab */}
        {activeTab === "journal" && (
          <div className="mb-8">
            <SymptomJournal />
          </div>
        )}
        
        {/* Family Profiles Tab */}
        {activeTab === "family" && (
          <div className="mb-8">
            <FamilyProfiles />
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          <Button
            variant="default"
            onClick={() => navigate('/')}
            className="bg-echoTeal-600 hover:bg-echoTeal-700"
          >
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
          <Button
            variant="outline"
            onClick={resetTests}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Start New Test
          </Button>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This is an early screening tool only and does not constitute medical advice.
            <br />
            Please consult with a healthcare professional for proper diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
