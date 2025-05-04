
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, PlusCircle, X } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { healthFAQs } from "./healthData";

const ChatAssistant = ({ resultsData = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hello! I'm EchoCare, your health assistant. How can I help you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const response = generateResponse(inputMessage, resultsData);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const generateResponse = (message, results) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for results-related questions
    if (results && lowerMessage.includes("result") || lowerMessage.includes("score")) {
      if (results.score < 30) {
        return "Your results indicate a low risk level. This is a positive outcome! It means we didn't detect significant health risk patterns in your voice and facial analysis. Continue with your current healthy habits and consider regular health check-ups as part of your routine.";
      } else if (results.score < 60) {
        return "Your results show some moderate risk indicators. This doesn't necessarily mean something is wrong, but it might be worth discussing these results with a healthcare professional during your next visit. Stay hydrated, ensure you're getting enough sleep, and manage stress through relaxation techniques.";
      } else {
        return "Your results indicate some higher risk patterns. We recommend consulting with a healthcare professional to discuss these findings. Remember that this is a screening tool, not a diagnostic device. Regular check-ups are important for maintaining your health.";
      }
    }
    
    // Check for sleep-related questions
    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired")) {
      return "To improve your sleep quality, try establishing a regular sleep schedule, avoid screens 1 hour before bed, keep your bedroom dark and cool, limit caffeine after noon, and consider relaxation techniques like deep breathing or meditation before bed.";
    }
    
    // Check for seriousness questions
    if (lowerMessage.includes("serious") || lowerMessage.includes("worried") || lowerMessage.includes("concern")) {
      return "EchoHealth is designed as an early screening tool, not as a diagnostic device. Any concerning results should be discussed with a qualified healthcare professional. Remember that many factors can influence your results, including temporary conditions like fatigue or stress.";
    }

    // Check other common health questions from our FAQ database
    for (const faq of healthFAQs) {
      if (lowerMessage.includes(faq.keyword)) {
        return faq.answer;
      }
    }

    // Default response
    return "Thank you for your question. While I can provide general health information, remember that I'm not a replacement for professional medical advice. If you have specific health concerns, please consult with a qualified healthcare provider.";
  };

  const clearChat = () => {
    setMessages([
      { 
        role: "assistant", 
        content: "Hello again! How can I help you today?"
      }
    ]);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Chat bubble button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-echoTeal-600 hover:bg-echoTeal-700 shadow-lg"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-xl border-echoTeal-200 dark:border-gray-700">
          {/* Chat header */}
          <div className="bg-echoTeal-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <h3 className="font-medium">EchoCare Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-echoTeal-700 rounded-full"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat messages */}
          <ScrollArea className="flex-1 p-3 bg-white dark:bg-gray-900">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1"
              ref={inputRef}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={!inputMessage.trim()} 
              className="bg-echoTeal-600 hover:bg-echoTeal-700"
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button 
              type="button"
              variant="outline" 
              size="icon"
              onClick={clearChat}
              className="text-gray-500"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ChatAssistant;
