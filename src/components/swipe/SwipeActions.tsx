import React from 'react';
import { X, Heart } from 'lucide-react';

interface SwipeActionsProps {
  onLike: () => void;
  onDislike: () => void;
}

export const SwipeActions: React.FC<SwipeActionsProps> = ({ onLike, onDislike }) => {
  return (
    <div className="flex justify-center items-center gap-8 mt-8">
      <button 
        onClick={onDislike}
        className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-110"
        aria-label="Dislike"
      >
        <X size={32} className="text-red-500" />
      </button>
      
      <button 
        onClick={onLike}
        className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-110"
        aria-label="Like"
      >
        <Heart size={32} className="text-primary-500" />
      </button>
    </div>
  );
};