import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProfileCard } from '../components/profile/ProfileCard';
import { PartnerSection } from '../components/profile/PartnerSection';

export const ProfilePage: React.FC = () => {
  const { logout, linkPartner, unlinkPartner } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleLinkPartner = (partnerId: string) => {
    linkPartner(partnerId);
  };
  
  const handleUnlinkPartner = () => {
    unlinkPartner();
  };
  
  return (
    <div className="flex-1 p-6 space-y-6">
      <ProfileCard onLogout={handleLogout} />
      <PartnerSection onLinkPartner={handleLinkPartner} onUnlinkPartner={handleUnlinkPartner} />
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
                Search Radius
              </label>
              <select
                id="radius"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="1">1 mile</option>
                <option value="3">3 miles</option>
                <option value="5" selected>5 miles</option>
                <option value="10">10 miles</option>
                <option value="20">20 miles</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                id="price"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3" selected>$$$</option>
                <option value="4">$$$$</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                {['Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'American'].map(cuisine => (
                  <div 
                    key={cuisine}
                    className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm hover:bg-primary-100 cursor-pointer"
                  >
                    {cuisine}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};