
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Brain, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIPS_CATEGORIES = {
  stress: [
    "Practice deep breathing for 5 minutes twice daily",
    "Take regular screen breaks using the 20-20-20 rule (look 20 feet away for 20 seconds every 20 minutes)",
    "Try progressive muscle relaxation before bed",
    "Use a mindfulness app for guided meditation",
    "Keep a gratitude journal to focus on positive aspects of life"
  ],
  sleep: [
    "Maintain a consistent sleep schedule, even on weekends",
    "Create a relaxing bedtime routine without screens",
    "Keep your bedroom cool, dark, and quiet",
    "Limit caffeine and alcohol consumption, especially in the afternoon and evening",
    "Consider using a white noise machine if noise disrupts your sleep"
  ],
  nutrition: [
    "Stay hydrated by drinking water throughout the day",
    "Include protein with each meal to stabilize blood sugar",
    "Increase intake of foods rich in omega-3 fatty acids (fish, walnuts, flaxseeds)",
    "Add colorful vegetables to your meals for antioxidants",
    "Choose whole grains over refined carbohydrates"
  ],
  activity: [
    "Aim for 150 minutes of moderate exercise per week",
    "Incorporate strength training at least twice weekly",
    "Take short walking breaks during long periods of sitting",
    "Try desk stretches throughout your workday",
    "Find physical activities you enjoy to make exercise sustainable"
  ],
  mental: [
    "Practice thought reframing when negative thoughts arise",
    "Set boundaries with work and digital media",
    "Schedule regular social connections with supportive people",
    "Consider journaling to process emotions",
    "Learn to recognize your personal stress triggers"
  ]
};

const AIHealthTips = ({ results }) => {
  const [tips, setTips] = useState([]);
  
  // Generate tips based on results or random if no results
  const generateTips = () => {
    let selectedCategories = [];
    
    if (results) {
      // Use results to determine which categories of tips to show
      if (results.voice?.stressLevel === "High" || results.score > 60) {
        selectedCategories.push("stress");
      }
      
      if (results.face?.blinkRate === "Low" || results.face?.eyeMovement === "Slow") {
        selectedCategories.push("sleep");
      }
      
      if (results.voice?.breathingPattern === "Irregular") {
        selectedCategories.push("activity");
      }
    }
    
    // Ensure we always have at least 2 categories
    if (selectedCategories.length < 2) {
      const allCategories = Object.keys(TIPS_CATEGORIES);
      while (selectedCategories.length < 2) {
        const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
        if (!selectedCategories.includes(randomCategory)) {
          selectedCategories.push(randomCategory);
        }
      }
    }
    
    // Generate the tips
    const newTips = selectedCategories.map(category => {
      const categoryTips = TIPS_CATEGORIES[category];
      // Get 2-3 random tips from the category
      const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
      const selectedTips = [];
      
      while (selectedTips.length < count) {
        const randomTip = categoryTips[Math.floor(Math.random() * categoryTips.length)];
        if (!selectedTips.includes(randomTip)) {
          selectedTips.push(randomTip);
        }
      }
      
      return {
        category,
        tips: selectedTips
      };
    });
    
    setTips(newTips);
  };
  
  // Generate tips on mount or when results change
  useEffect(() => {
    generateTips();
  }, [results]);
  
  const getCategoryTitle = (category) => {
    switch (category) {
      case "stress":
        return "Stress Management";
      case "sleep":
        return "Sleep Improvement";
      case "nutrition":
        return "Nutrition Recommendations";
      case "activity":
        return "Physical Activity";
      case "mental":
        return "Mental Wellbeing";
      default:
        return "Health Tips";
    }
  };
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case "stress":
        return "🧠";
      case "sleep":
        return "😴";
      case "nutrition":
        return "🥗";
      case "activity":
        return "🚶";
      case "mental":
        return "🧘";
      default:
        return "💡";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-echoTeal-600 dark:text-echoTeal-400" />
          <h3 className="text-lg font-medium">AI Health Recommendations</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={generateTips}
          className="text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((categoryTips, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center mb-3">
              <span className="text-xl mr-2">{getCategoryIcon(categoryTips.category)}</span>
              <h4 className="font-medium">{getCategoryTitle(categoryTips.category)}</h4>
            </div>
            
            <ul className="space-y-2 pl-5">
              {categoryTips.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="text-sm list-disc text-gray-700 dark:text-gray-300">
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        These recommendations are generated based on patterns detected in your assessment.
        <br />Always consult with healthcare professionals for personalized advice.
      </p>
    </div>
  );
};

export default AIHealthTips;
