
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Mic, Camera } from "lucide-react";

const ConsentModal = ({ onConsent }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [consented, setConsented] = useState(false);

  const handleConsent = () => {
    if (consented) {
      setIsOpen(false);
      onConsent();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-echoTeal-600" />
            Privacy & Consent
          </DialogTitle>
          <DialogDescription>
            EchoHealth respects your privacy. We need your permission before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium flex items-center mb-2">
              <Mic className="mr-2 h-4 w-4 text-echoTeal-600" />
              Voice Analysis
            </h4>
            <p className="text-sm text-muted-foreground">
              Your voice recording will be processed locally on your device. No audio is sent to any server.
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium flex items-center mb-2">
              <Camera className="mr-2 h-4 w-4 text-echoTeal-600" />
              Face Analysis
            </h4>
            <p className="text-sm text-muted-foreground">
              Your facial analysis is processed entirely on-device using browser AI. No images or videos leave your device.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="consent"
              checked={consented}
              onCheckedChange={(checked) => setConsented(checked === true)}
            />
            <label
              htmlFor="consent"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              I understand and consent to local processing of my voice and face data
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="default"
            onClick={handleConsent}
            disabled={!consented}
            className="bg-echoTeal-600 hover:bg-echoTeal-700"
          >
            I Consent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentModal;
