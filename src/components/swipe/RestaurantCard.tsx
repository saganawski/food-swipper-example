import React, { useState } from 'react';
import { Star, MapPin, DollarSign, Info } from 'lucide-react';

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
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onInfo }) => {
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
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
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
    </div>
  );
};