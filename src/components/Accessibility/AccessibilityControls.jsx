
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, Type, Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "../../hooks/use-theme";
import LanguageSelector from "./LanguageSelector";

const TEXT_SIZES = ["Normal", "Large", "X-Large"];
const TEXT_FONTS = ["Default", "Dyslexic-Friendly", "High-Contrast"];

const AccessibilityControls = () => {
  const { theme, setTheme } = useTheme();
  const [textSize, setTextSize] = useState(() => {
    return localStorage.getItem("echohealth-text-size") || "Normal";
  });
  const [textFont, setTextFont] = useState(() => {
    return localStorage.getItem("echohealth-text-font") || "Default";
  });
  
  useEffect(() => {
    localStorage.setItem("echohealth-text-size", textSize);
    
    // Apply text size
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("text-normal", "text-large", "text-xl");
    
    switch (textSize) {
      case "Large":
        htmlEl.classList.add("text-large");
        break;
      case "X-Large":
        htmlEl.classList.add("text-xl");
        break;
      default:
        htmlEl.classList.add("text-normal");
    }
  }, [textSize]);
  
  useEffect(() => {
    localStorage.setItem("echohealth-text-font", textFont);
    
    // Apply font
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("font-default", "font-dyslexic", "font-contrast");
    
    switch (textFont) {
      case "Dyslexic-Friendly":
        htmlEl.classList.add("font-dyslexic");
        break;
      case "High-Contrast":
        htmlEl.classList.add("font-contrast");
        break;
      default:
        htmlEl.classList.add("font-default");
    }
  }, [textFont]);
  
  return (
    <div className="flex items-center gap-2">
      <LanguageSelector />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Accessibility options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel className="text-xs flex items-center">
            <Type className="h-3 w-3 mr-1" />
            Text Size
          </DropdownMenuLabel>
          {TEXT_SIZES.map((size) => (
            <DropdownMenuItem
              key={size}
              onClick={() => setTextSize(size)}
              className="flex items-center justify-between"
            >
              {size}
              {textSize === size && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel className="text-xs flex items-center">
            <Type className="h-3 w-3 mr-1" />
            Font Style
          </DropdownMenuLabel>
          {TEXT_FONTS.map((font) => (
            <DropdownMenuItem
              key={font}
              onClick={() => setTextFont(font)}
              className="flex items-center justify-between"
            >
              {font}
              {textFont === font && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel className="text-xs flex items-center">
            <Sun className="h-3 w-3 mr-1" />
            Theme
          </DropdownMenuLabel>
          <DropdownMenuItem 
            onClick={() => setTheme("light")}
            className="flex items-center justify-between"
          >
            Light
            {theme === "light" && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")}
            className="flex items-center justify-between"
          >
            Dark
            {theme === "dark" && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Add Check component for accessibility controls
const Check = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export default AccessibilityControls;
