
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { UserPlus, User, Edit, Trash2, Users } from "lucide-react";

const MAX_PROFILES = 3;

const FamilyProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileRelation, setNewProfileRelation] = useState('');
  
  useEffect(() => {
    // Load profiles from localStorage
    const savedProfiles = JSON.parse(localStorage.getItem('echohealth-family-profiles')) || [];
    setProfiles(savedProfiles);
    
    // Set current profile if exists
    const savedCurrentProfile = localStorage.getItem('echohealth-current-profile');
    if (savedCurrentProfile) {
      const profileIndex = savedProfiles.findIndex(p => p.id === savedCurrentProfile);
      if (profileIndex >= 0) {
        setCurrentProfile(savedProfiles[profileIndex]);
      } else if (savedProfiles.length > 0) {
        setCurrentProfile(savedProfiles[0]);
      }
    } else if (savedProfiles.length > 0) {
      setCurrentProfile(savedProfiles[0]);
    }
  }, []);
  
  useEffect(() => {
    // Save profiles to localStorage whenever they change
    localStorage.setItem('echohealth-family-profiles', JSON.stringify(profiles));
    
    // Update current profile if it was removed
    if (currentProfile && !profiles.find(p => p.id === currentProfile.id)) {
      if (profiles.length > 0) {
        setCurrentProfile(profiles[0]);
      } else {
        setCurrentProfile(null);
      }
    }
  }, [profiles]);
  
  useEffect(() => {
    // Save current profile to localStorage
    if (currentProfile) {
      localStorage.setItem('echohealth-current-profile', currentProfile.id);
    } else {
      localStorage.removeItem('echohealth-current-profile');
    }
  }, [currentProfile]);

  const addProfile = () => {
    if (profiles.length >= MAX_PROFILES) return;
    if (!newProfileName.trim()) return;
    
    const newProfile = {
      id: Date.now().toString(),
      name: newProfileName.trim(),
      relation: newProfileRelation.trim() || 'Family Member',
      dateAdded: new Date().toISOString(),
      results: []
    };
    
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    
    // If this is the first profile, set it as current
    if (updatedProfiles.length === 1) {
      setCurrentProfile(newProfile);
    }
    
    // Close the dialog and reset fields
    setIsAddingProfile(false);
    setNewProfileName('');
    setNewProfileRelation('');
  };
  
  const deleteProfile = (profileId) => {
    setProfiles(profiles.filter(p => p.id !== profileId));
  };
  
  const switchToProfile = (profile) => {
    setCurrentProfile(profile);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Family Mode
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage health profiles for your family
          </p>
        </div>
        
        <Button
          onClick={() => setIsAddingProfile(true)}
          disabled={profiles.length >= MAX_PROFILES}
          size="sm"
          className="bg-echoTeal-600 hover:bg-echoTeal-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Profile
        </Button>
      </div>
      
      {profiles.length === 0 ? (
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <User className="h-12 w-12 text-gray-400 mb-2" />
          <h4 className="text-lg font-medium">No Profiles Added</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Add family members to keep track of their health assessments
          </p>
          <Button 
            onClick={() => setIsAddingProfile(true)}
            className="bg-echoTeal-600 hover:bg-echoTeal-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add First Profile
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map(profile => (
            <Card 
              key={profile.id} 
              className={`p-4 ${
                currentProfile?.id === profile.id 
                  ? "border-echoTeal-500 dark:border-echoTeal-400 ring-1 ring-echoTeal-500" 
                  : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{profile.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{profile.relation}</p>
                </div>
                
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteProfile(profile.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                Added on {new Date(profile.dateAdded).toLocaleDateString()}
              </div>
              
              {profile.results.length > 0 && (
                <div className="mt-2 text-xs">
                  Last assessment: {new Date(profile.results[0].date).toLocaleDateString()}
                </div>
              )}
              
              {currentProfile?.id !== profile.id && (
                <Button
                  onClick={() => switchToProfile(profile)}
                  variant="outline"
                  className="w-full mt-3 text-xs"
                  size="sm"
                >
                  Switch to this profile
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
      
      {/* Add Profile Dialog */}
      <Dialog open={isAddingProfile} onOpenChange={setIsAddingProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Family Member Profile</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium col-span-1">
                Name
              </label>
              <Input
                id="name"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="col-span-3"
                placeholder="Enter name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="relation" className="text-right text-sm font-medium col-span-1">
                Relation
              </label>
              <Input
                id="relation"
                value={newProfileRelation}
                onChange={(e) => setNewProfileRelation(e.target.value)}
                className="col-span-3"
                placeholder="E.g., Parent, Child, Spouse"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingProfile(false)}>
              Cancel
            </Button>
            <Button 
              onClick={addProfile} 
              disabled={!newProfileName.trim()}
              className="bg-echoTeal-600 hover:bg-echoTeal-700"
            >
              Add Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FamilyProfiles;
