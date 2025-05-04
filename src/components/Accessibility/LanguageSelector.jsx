
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";

const LANGUAGES = [
  { name: "English", code: "en" },
  { name: "Hindi", code: "hi" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Chinese", code: "zh" },
  { name: "Japanese", code: "ja" },
  { name: "Russian", code: "ru" },
  { name: "Arabic", code: "ar" },
  { name: "Portuguese", code: "pt" }
];

const LanguageSelector = () => {
  const [language, setLanguage] = useState(() => {
    const storedLang = localStorage.getItem("echohealth-language");
    return storedLang || "en";
  });
  
  useEffect(() => {
    localStorage.setItem("echohealth-language", language);
    // In a real app, this would trigger language changes throughout the application
    document.documentElement.setAttribute("lang", language);
  }, [language]);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Globe className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:ml-1">
            {LANGUAGES.find(lang => lang.code === language)?.name || "English"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center justify-between"
          >
            {lang.name}
            {language === lang.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
