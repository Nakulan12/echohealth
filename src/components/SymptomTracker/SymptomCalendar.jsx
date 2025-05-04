
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const SymptomCalendar = ({ entries }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  
  // Generate month and year strings for header
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Get entries for the current month
  const getEntriesForDate = (day) => {
    const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.filter(entry => entry.date === dateString);
  };
  
  // Get color intensity based on number and severity of entries
  const getColorIntensity = (entries) => {
    if (entries.length === 0) return 0;
    
    // Calculate intensity based on severity
    let severityScore = 0;
    for (const entry of entries) {
      if (entry.severity === "Mild") severityScore += 1;
      else if (entry.severity === "Moderate") severityScore += 2;
      else if (entry.severity === "Severe") severityScore += 3;
    }
    
    // Scale to 1-5 intensity
    const avgSeverity = severityScore / entries.length;
    return Math.min(Math.ceil(avgSeverity * 1.7), 5);
  };
  
  // Generate calendar grid cells
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="h-12 border border-gray-100 dark:border-gray-800"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEntries = getEntriesForDate(day);
    const intensity = getColorIntensity(dayEntries);
    
    calendarCells.push(
      <div 
        key={`day-${day}`} 
        className={`h-12 border border-gray-100 dark:border-gray-800 p-1 relative ${
          dayEntries.length > 0 ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800" : ""
        }`}
      >
        <div className="text-xs absolute top-1 left-1">{day}</div>
        
        {intensity > 0 && (
          <div
            className={`absolute inset-1 rounded-sm opacity-60 ${
              intensity === 1 ? "bg-green-200 dark:bg-green-900/50" :
              intensity === 2 ? "bg-green-300 dark:bg-green-800/60" :
              intensity === 3 ? "bg-amber-200 dark:bg-amber-800/60" :
              intensity === 4 ? "bg-amber-300 dark:bg-amber-700/70" :
              "bg-red-300 dark:bg-red-700/70"
            }`}
          ></div>
        )}
        
        {dayEntries.length > 0 && (
          <div className="absolute bottom-1 right-1 text-xs font-medium">
            {dayEntries.length}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h3 className="text-lg font-medium flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Calendar days header */}
      <div className="grid grid-cols-7 gap-0 mb-1 text-xs font-medium text-gray-500 dark:text-gray-400 text-center">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0">
        {calendarCells}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center text-xs">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-green-200 dark:bg-green-900/50 mr-1 rounded-sm"></div>
          <span>Mild</span>
        </div>
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-amber-200 dark:bg-amber-800/60 mr-1 rounded-sm"></div>
          <span>Moderate</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-300 dark:bg-red-700/70 mr-1 rounded-sm"></div>
          <span>Severe</span>
        </div>
      </div>
    </Card>
  );
};

export default SymptomCalendar;
