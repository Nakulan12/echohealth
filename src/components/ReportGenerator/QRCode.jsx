
import { Card } from "@/components/ui/card";

const QRCode = ({ results, userName }) => {
  // Generate a data string that would be encoded in the QR
  const generateQRDataString = () => {
    const data = {
      user: userName,
      timestamp: new Date().toISOString(),
      score: results?.score || 0,
      riskLevel: results?.riskLevel || "Unknown",
      id: `echo-${Date.now().toString(36)}`
    };
    
    return JSON.stringify(data);
  };
  
  // In a real app, we would use a QR code generation library
  // For this demo, we'll display a placeholder
  
  return (
    <Card className="p-4 mt-4 max-w-xs mx-auto">
      <div className="text-center">
        <h4 className="text-sm font-medium mb-2">EchoHealth QR Card</h4>
        <p className="text-xs text-gray-500 mb-3">Scan for quick access to your health data</p>
        
        {/* Placeholder for QR code */}
        <div className="w-48 h-48 mx-auto bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-xs text-gray-500">
            QR Code would be generated here
            <br />
            <span className="text-xxs block mt-1 text-gray-400">
              Data: {generateQRDataString().substring(0, 20)}...
            </span>
          </div>
        </div>
        
        <div className="mt-3 text-xs">
          <p className="font-medium">{userName}</p>
          <p className="text-gray-500">ID: echo-{Date.now().toString(36).substring(0, 8)}</p>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default QRCode;
