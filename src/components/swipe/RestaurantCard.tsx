import React, { useState } from 'react';
import { Star, MapPin, DollarSign, Info, X, Heart } from 'lucide-react';

interface RestaurantCardProps {
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
  onInfo: () => void;
  onLike: () => void;
  onDislike: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onInfo, onLike, onDislike }) => {
  const { name, image, rating, priceLevel, cuisine, distance } = restaurant;
  
  // Create price level display
  const priceDisplay = Array(priceLevel)
    .fill(0)
    .map((_, i) => '$')
    .join('');

  return (
    <div className="relative w-full h-[70vh] max-h-[600px] rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      
      {/* Restaurant Details - adjusted for mobile */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {/* Mobile: Add extra bottom padding to accommodate action bar */}
        <div className="md:mb-0 mb-16">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold">{name}</h2>
            <button 
              onClick={onInfo}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="More information"
            >
              <Info size={20} className="text-white" />
            </button>
          </div>
          
          <div className="flex items-center mb-2">
            <Star className="text-yellow-400 mr-1" size={18} />
            <span className="mr-3">{rating.toFixed(1)}</span>
            <span className="mr-3 text-gray-200">•</span>
            <span className="mr-3">{cuisine}</span>
            <span className="mr-3 text-gray-200">•</span>
            <span>{priceDisplay}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="mr-1" size={18} />
            <span>{distance}</span>
          </div>
        </div>
        
        {/* Mobile Action Bar - integrated with content area */}
        <div className="md:hidden flex justify-center items-center gap-6 pt-4 border-t border-white/20">
          <button 
            onClick={onDislike}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-200 hover:bg-white transition-all hover:scale-110"
            aria-label="Dislike"
          >
            <X size={24} className="text-red-500" />
          </button>
          
          <button 
            onClick={onLike}
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-green-200 hover:bg-white transition-all hover:scale-110"
            aria-label="Like"
          >
            <Heart size={24} className="text-green-500" />
          </button>
        </div>
      </div>
    </div>
  );
};