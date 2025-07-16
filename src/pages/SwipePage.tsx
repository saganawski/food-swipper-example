import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { useSwipe } from '../contexts/SwipeContext';
import { RestaurantCard } from '../components/swipe/RestaurantCard';
import { RestaurantDetail } from '../components/swipe/RestaurantDetail';
import { SwipeActions } from '../components/swipe/SwipeActions';
import { MatchNotification } from '../components/swipe/MatchNotification';

export const SwipePage: React.FC = () => {
  const { 
    currentRestaurant, 
    like, 
    dislike, 
    loading, 
    showMatchNotification, 
    matchedRestaurant, 
    dismissMatchNotification 
  } = useSwipe();
  const [showDetails, setShowDetails] = useState(false);
  
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <Loader className="animate-spin text-primary-500 mb-4" size={32} />
        <p className="text-gray-600">Finding restaurants near you...</p>
      </div>
    );
  }
  
  if (!currentRestaurant) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
          <Loader className="text-gray-400" size={32} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No more restaurants</h2>
        <p className="text-gray-600 mb-6">We've run out of suggestions for now. Check back later for more options!</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <RestaurantCard 
          restaurant={currentRestaurant} 
          onInfo={() => setShowDetails(true)} 
        />
        
        <SwipeActions onLike={like} onDislike={dislike} />
      </div>
      
      {showDetails && (
        <RestaurantDetail 
          restaurant={currentRestaurant} 
          onClose={() => setShowDetails(false)} 
        />
      )}
      
      {showMatchNotification && matchedRestaurant && (
        <MatchNotification 
          restaurant={matchedRestaurant} 
          onDismiss={dismissMatchNotification} 
        />
      )}
    </div>
  );
};