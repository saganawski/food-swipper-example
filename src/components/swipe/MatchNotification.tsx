import React from 'react';
import { Heart, X } from 'lucide-react';

interface MatchNotificationProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
    rating: number;
    priceLevel: number;
    cuisine: string;
    distance: string;
    address: string;
    description: string;
  };
  onDismiss: () => void;
}

export const MatchNotification: React.FC<MatchNotificationProps> = ({ restaurant, onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-pulse">
        <button 
          onClick={onDismiss}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Close notification"
        >
          <X size={18} className="text-gray-800" />
        </button>
        
        <div className="h-48 relative">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-white" size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">It's a Match!</h2>
          <p className="text-gray-600 mb-4">
            You and your partner both liked <span className="font-semibold text-primary-600">{restaurant.name}</span>
          </p>
          
          <div className="space-y-3">
            <button
              onClick={onDismiss}
              className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Keep Swiping
            </button>
            <button
              onClick={onDismiss}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};