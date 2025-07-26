import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineMessage) return null;

  return (
    <div className={`fixed top-4 left-4 right-4 rounded-lg p-3 z-50 transition-all duration-300 ${
      isOnline 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      <div className="flex items-center space-x-2">
        {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
        <span className="font-medium">
          {isOnline ? 'Back online!' : 'You\'re offline'}
        </span>
        <span className="text-sm opacity-80">
          {isOnline 
            ? 'All features are available' 
            : 'Some features may be limited'
          }
        </span>
      </div>
    </div>
  );
}