import React, { useState } from 'react';
import { UserPlus, UserMinus, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../data/mockData';

interface PartnerSectionProps {
  onLinkPartner: (partnerId: string) => void;
  onUnlinkPartner: () => void;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({ 
  onLinkPartner, 
  onUnlinkPartner 
}) => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  if (!currentUser) return null;
  
  // Find linked partner if exists
  const partner = currentUser.partnerId 
    ? mockUsers.find(user => user.id === currentUser.partnerId) 
    : null;
  
  // Find available users to link (exclude current user and already linked partner)
  const availableUsers = mockUsers.filter(user => 
    user.id !== currentUser.id && user.id !== currentUser.partnerId
  );
  
  // Filter available users by search term
  const filteredUsers = searchTerm.trim() 
    ? availableUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableUsers;
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Food Partner</h3>
        
        {partner ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img 
                  src={partner.avatar} 
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{partner.name}</p>
                <p className="text-sm text-gray-600">{partner.email}</p>
              </div>
            </div>
            
            <button 
              onClick={onUnlinkPartner}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Unlink partner"
            >
              <UserMinus size={20} />
            </button>
          </div>
        ) : (
          <div>
            {isSearching ? (
              <div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {filteredUsers.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No users found</p>
                  ) : (
                    filteredUsers.map(user => (
                      <div 
                        key={user.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => onLinkPartner(user.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        
                        <UserPlus size={18} className="text-primary-500" />
                      </div>
                    ))
                  )}
                </div>
                
                <button 
                  onClick={() => setIsSearching(false)}
                  className="w-full mt-4 text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsSearching(true)}
                className="flex items-center justify-center w-full px-4 py-3 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
              >
                <UserPlus size={18} className="mr-2" />
                <span>Connect with a food partner</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};