
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Voice Scan", path: "/voice-analysis" },
    { name: "Face Scan", path: "/face-analysis" },
    { name: "Results", path: "/results" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="h-8 w-8 mr-2 bg-echoTeal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </span>
              <span className="font-bold text-xl text-echoTeal-700 dark:text-echoTeal-400">
                EchoHealth
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-echoTeal-100 text-echoTeal-800 dark:bg-echoTeal-800/30 dark:text-echoTeal-200"
                      : "text-gray-600 hover:bg-echoTeal-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                aria-label="Language options"
              >
                <Globe size={18} />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "bg-echoTeal-100 text-echoTeal-800 dark:bg-echoTeal-800/30 dark:text-echoTeal-200"
                    : "text-gray-600 hover:bg-echoTeal-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Globe size={16} className="mr-2" /> Language
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
