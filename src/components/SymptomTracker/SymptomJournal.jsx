
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarPlus, CalendarCheck, Save, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import SymptomCalendar from "./SymptomCalendar";

const SYMPTOMS = [
  "Headache",
  "Fatigue",
  "Stress",
  "Anxiety",
  "Dizziness",
  "Sleep Issues",
  "Brain Fog",
  "Mood Changes",
  "Other"
];

const SEVERITY = ["Mild", "Moderate", "Severe"];

const SymptomJournal = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    symptom: "",
    severity: "Mild",
    notes: ""
  });
  
  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem('echohealth-symptom-journal')) || [];
    setEntries(savedEntries);
  }, []);
  
  useEffect(() => {
    // Save entries to localStorage whenever they change
    localStorage.setItem('echohealth-symptom-journal', JSON.stringify(entries));
  }, [entries]);
  
  const handleAddEntry = () => {
    if (!newEntry.symptom) {
      toast({
        title: "Missing information",
        description: "Please select a symptom",
        variant: "destructive",
      });
      return;
    }
    
    const entry = {
      ...newEntry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setEntries([entry, ...entries]);
    
    toast({
      title: "Entry Added",
      description: "Your symptom journal entry has been saved.",
    });
    
    // Reset form
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      symptom: "",
      severity: "Mild",
      notes: ""
    });
    setShowForm(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium flex items-center">
            <CalendarCheck className="mr-2 h-5 w-5" />
            Symptom Journal & Tracker
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Keep track of your symptoms and patterns over time
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) setShowCalendar(false);
            }}
            size="sm"
            className="bg-echoTeal-600 hover:bg-echoTeal-700"
          >
            {showForm ? "Cancel" : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </>
            )}
          </Button>
          
          <Button
            onClick={() => {
              setShowCalendar(!showCalendar);
              if (showCalendar) setShowForm(false);
            }}
            size="sm"
            variant="outline"
          >
            <CalendarPlus className="h-4 w-4 mr-2" />
            {showCalendar ? "Hide Calendar" : "View Calendar"}
          </Button>
        </div>
      </div>
      
      {/* Entry Form */}
      {showForm && (
        <Card className="p-4">
          <h4 className="font-medium mb-3">New Journal Entry</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="date" className="text-sm font-medium block mb-1">Date</label>
                <Input
                  id="date"
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="symptom" className="text-sm font-medium block mb-1">Symptom</label>
                <Select
                  value={newEntry.symptom}
                  onValueChange={(value) => setNewEntry({...newEntry, symptom: value})}
                >
                  <SelectTrigger id="symptom">
                    <SelectValue placeholder="Select symptom" />
                  </SelectTrigger>
                  <SelectContent>
                    {SYMPTOMS.map((symptom) => (
                      <SelectItem key={symptom} value={symptom}>
                        {symptom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label htmlFor="severity" className="text-sm font-medium block mb-1">Severity</label>
              <Select
                value={newEntry.severity}
                onValueChange={(value) => setNewEntry({...newEntry, severity: value})}
              >
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {SEVERITY.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="notes" className="text-sm font-medium block mb-1">Notes</label>
              <Textarea
                id="notes"
                placeholder="Add any additional details about your symptoms"
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                rows={3}
              />
            </div>
            
            <Button
              onClick={handleAddEntry}
              className="w-full bg-echoTeal-600 hover:bg-echoTeal-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </Card>
      )}
      
      {/* Calendar View */}
      {showCalendar && (
        <SymptomCalendar entries={entries} />
      )}
      
      {/* Journal Entries List */}
      {!showCalendar && (
        <>
          <h4 className="font-medium">Recent Entries</h4>
          {entries.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No symptom entries yet. Add your first entry to start tracking.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {entries.slice(0, 5).map((entry) => (
                <Card key={entry.id} className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">{entry.symptom}</span>
                        <span 
                          className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            entry.severity === "Mild" ? "bg-green-100 text-green-800" :
                            entry.severity === "Moderate" ? "bg-amber-100 text-amber-800" :
                            "bg-red-100 text-red-800"
                          }`}
                        >
                          {entry.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {entry.notes && (
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {entry.notes}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              
              {entries.length > 5 && (
                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={() => setShowCalendar(true)}
                    className="text-echoTeal-600 dark:text-echoTeal-400"
                  >
                    View all {entries.length} entries
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SymptomJournal;
