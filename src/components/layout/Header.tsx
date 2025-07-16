import React from 'react';
import { useLocation } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Determine title based on current route
  const getTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Discover';
    if (path === '/matches') return 'Your Matches';
    if (path.startsWith('/chat')) return 'Chat';
    if (path === '/profile') return 'Profile';
    return 'FoodSwipe';
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Utensils className="text-primary-500 mr-2" size={24} />
        <h1 className="text-xl font-semibold text-gray-900">{getTitle()}</h1>
      </div>
      
      {currentUser && (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </header>
  );
};