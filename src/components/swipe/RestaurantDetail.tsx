import React from 'react';
import { X, Star, MapPin, DollarSign, Clock } from 'lucide-react';

interface RestaurantDetailProps {
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
  onClose: () => void;
}

export const RestaurantDetail: React.FC<RestaurantDetailProps> = ({ restaurant, onClose }) => {
  const { name, image, rating, priceLevel, cuisine, address, description } = restaurant;
  
  // Create price level display
  const priceDisplay = Array(priceLevel)
    .fill(0)
    .map((_, i) => '$')
    .join('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Close details"
        >
          <X size={20} className="text-gray-800" />
        </button>
        
        <div className="h-48 relative">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-3">
              <Star className="text-yellow-500 mr-1" size={18} />
              <span className="text-gray-700">{rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400 mx-2">•</span>
            <div className="text-gray-700">{cuisine}</div>
            <span className="text-gray-400 mx-2">•</span>
            <div className="text-gray-700">{priceDisplay}</div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-start mb-2">
              <MapPin className="text-gray-500 mr-2 mt-1 flex-shrink-0" size={18} />
              <p className="text-gray-700">{address}</p>
            </div>
            <div className="flex items-start">
              <Clock className="text-gray-500 mr-2 mt-1 flex-shrink-0" size={18} />
              <p className="text-gray-700">Open now: 11:00 AM - 10:00 PM</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700">{description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Popular dishes</h3>
            <div className="flex overflow-x-auto gap-3 pb-2">
              <div className="flex-shrink-0 w-24">
                <div className="w-24 h-24 rounded-lg bg-gray-200 mb-1"></div>
                <p className="text-sm text-gray-700 truncate">Special Dish 1</p>
              </div>
              <div className="flex-shrink-0 w-24">
                <div className="w-24 h-24 rounded-lg bg-gray-200 mb-1"></div>
                <p className="text-sm text-gray-700 truncate">Special Dish 2</p>
              </div>
              <div className="flex-shrink-0 w-24">
                <div className="w-24 h-24 rounded-lg bg-gray-200 mb-1"></div>
                <p className="text-sm text-gray-700 truncate">Special Dish 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};