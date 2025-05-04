
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertCircle, X, Heart, Phone, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PanicButton = () => {
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState(() => {
    const storedContact = localStorage.getItem('echohealth-emergency-contact');
    return storedContact ? JSON.parse(storedContact) : null;
  });
  const [isSettingContact, setIsSettingContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  
  const saveEmergencyContact = () => {
    if (contactName.trim() && contactPhone.trim()) {
      const contact = {
        name: contactName.trim(),
        phone: contactPhone.trim()
      };
      
      localStorage.setItem('echohealth-emergency-contact', JSON.stringify(contact));
      setEmergencyContact(contact);
      setIsSettingContact(false);
      
      toast({
        title: "Emergency contact saved",
        description: `${contactName} has been set as your emergency contact.`,
      });
    }
  };
  
  const handlePanicButtonClick = () => {
    setIsButtonAnimating(true);
    
    // Animate button for 700ms before opening dialog
    setTimeout(() => {
      setIsButtonAnimating(false);
      setIsPanicOpen(true);
    }, 700);
  };
  
  const getLocation = () => {
    // In a real app, this would use the Geolocation API to get the user's location
    // For this demo, we'll just return a placeholder
    return "Location sharing would be enabled here";
  };
  
  const sendEmergencyAlert = () => {
    // In a real app with backend integration, this would send an SMS or email
    // For this demo, we'll just show a toast notification
    toast({
      title: "Emergency Alert Sent",
      description: `Alert sent to ${emergencyContact.name}. Help is on the way.`,
      variant: "destructive",
    });
    
    console.log("Emergency alert would be sent to:", emergencyContact);
    console.log("Location:", getLocation());
  };
  
  const breathingExercise = [
    "Breathe in through your nose for 4 seconds",
    "Hold your breath for 4 seconds",
    "Exhale slowly through your mouth for 6 seconds",
    "Repeat this pattern 5 times"
  ];
  
  return (
    <>
      <Button
        onClick={handlePanicButtonClick}
        variant="destructive"
        className={`w-full flex items-center justify-center gap-2 py-3 h-auto shadow-lg transition-all duration-500 
          ${isButtonAnimating ? 'animate-pulse scale-105 shadow-red-500/50' : 'hover:bg-red-600 hover:scale-102'}
          bg-gradient-to-r from-red-500 to-red-600 border-2 border-red-400 dark:border-red-700`}
        size="lg"
      >
        <AlertTriangle className="h-5 w-5" />
        <span className="font-medium">I'm Not Feeling Well</span>
      </Button>
      
      <Dialog open={isPanicOpen} onOpenChange={setIsPanicOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-gray-900 shadow-xl border-red-200 dark:border-red-900/30">
          <DialogHeader className="border-b pb-2 border-red-100 dark:border-red-900/30">
            <DialogTitle className="text-center text-lg flex items-center justify-center text-red-600 dark:text-red-400">
              <Heart className="text-red-500 mr-2 h-5 w-5 animate-pulse" />
              Emergency Assistant
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <p className="text-gray-700 dark:text-gray-300">
                Take a moment to breathe. We're here to help.
              </p>
            </div>
            
            {/* Breathing Exercise */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800/30">
              <h3 className="font-medium text-center mb-3 text-red-700 dark:text-red-300">Calming Breath Exercise</h3>
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-200 dark:bg-red-700/30 flex items-center justify-center animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-red-300 dark:bg-red-600/30"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-red-300 dark:border-red-700 animate-ping opacity-50"></div>
                </div>
              </div>
              <ol className="space-y-2">
                {breathingExercise.map((step, index) => (
                  <li key={index} className="text-sm flex">
                    <span className="mr-2 text-red-500 dark:text-red-400">{index + 1}.</span>
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            {/* Emergency Contact */}
            {!emergencyContact ? (
              !isSettingContact ? (
                <div className="text-center border border-dashed border-red-200 dark:border-red-800/30 rounded-lg p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Set up an emergency contact to enable quick alerts
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSettingContact(true)}
                    className="text-sm border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Add Emergency Contact
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 border p-3 rounded-lg border-red-100 dark:border-red-900/30">
                  <h4 className="font-medium">Add Emergency Contact</h4>
                  <div>
                    <label className="text-sm mb-1 block">Contact Name</label>
                    <Input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter name"
                      className="border-red-100 dark:border-red-900/30 focus:border-red-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Phone Number</label>
                    <Input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="border-red-100 dark:border-red-900/30 focus:border-red-300"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="flex-1"
                      onClick={() => setIsSettingContact(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={saveEmergencyContact}
                      disabled={!contactName.trim() || !contactPhone.trim()}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      Save Contact
                    </Button>
                  </div>
                </div>
              )
            ) : (
              <div className="border p-4 rounded-lg space-y-3 bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30">
                <h4 className="font-medium flex items-center text-red-700 dark:text-red-300">
                  <Phone className="h-4 w-4 mr-1" />
                  Emergency Contact
                </h4>
                <p className="text-sm">
                  <strong>{emergencyContact.name}</strong>
                  <br />
                  {emergencyContact.phone}
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={sendEmergencyAlert}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Send Alert
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                    onClick={() => setIsSettingContact(true)}
                  >
                    Change Contact
                  </Button>
                </div>
              </div>
            )}
            
            {/* Location */}
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 p-2 border-t border-red-100 dark:border-red-900/30">
              <MapPin className="h-4 w-4 mr-1 text-red-500" />
              <span>Your location will be shared with emergency contact</span>
            </div>
            
            <div className="flex justify-center pt-2">
              <Button
                variant="ghost"
                onClick={() => setIsPanicOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4 mr-1" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PanicButton;
