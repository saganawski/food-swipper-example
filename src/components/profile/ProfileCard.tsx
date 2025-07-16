import React from 'react';
import { Edit, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileCardProps {
  onLogout: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ onLogout }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary-400 to-primary-600"></div>
      
      <div className="px-6 pb-6 relative">
        <div className="flex justify-end mt-2">
          <button 
            onClick={onLogout}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <LogOut size={16} className="mr-1" />
            <span>Logout</span>
          </button>
        </div>
        
        <div className="absolute -top-16 left-6">
          <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>
      </div>
    </div>
  );
};