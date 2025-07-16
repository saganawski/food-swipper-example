import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';

export const ChatPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { getMatch, getMatchRestaurant, getMatchPartner, sendMessage } = useMatch();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  
  if (!matchId) {
    navigate('/matches');
    return null;
  }
  
  const match = getMatch(matchId);
  const restaurant = match ? getMatchRestaurant(matchId) : null;
  const partner = match ? getMatchPartner(matchId) : null;
  
  if (!match || !restaurant || !partner) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-gray-600">Match not found</p>
        <button 
          onClick={() => navigate('/matches')}
          className="mt-4 px-4 py-2 text-primary-500 hover:text-primary-600"
        >
          Back to Matches
        </button>
      </div>
    );
  }
  
  const handleSendMessage = (text: string) => {
    sendMessage(matchId, text);
  };
  
  // Format the date
  const matchDate = new Date(match.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className="flex-1 flex flex-col h-full max-h-[calc(100vh-112px)]">
      <div className="bg-white border-b border-gray-200 p-3 flex items-center">
        <button 
          onClick={() => navigate('/matches')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
          aria-label="Back to matches"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        
        <div className="flex-1 flex items-center" onClick={() => setIsInfoVisible(!isInfoVisible)}>
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src={partner.avatar} 
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">{partner.name}</p>
            <p className="text-xs text-gray-500">
              Matched on {matchDate} • {restaurant.name}
            </p>
          </div>
        </div>
      </div>
      
      {isInfoVisible && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-lg overflow-hidden mr-3">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.priceLevel === 1 ? '$' : restaurant.priceLevel === 2 ? '$$' : restaurant.priceLevel === 3 ? '$$$' : '$$$$'}</p>
              <p className="text-sm text-gray-600">{restaurant.address}</p>
            </div>
          </div>
          <button
            className="w-full mt-3 flex items-center justify-center py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            <Coffee size={18} className="mr-2" />
            <span>Make a Reservation</span>
          </button>
        </div>
      )}
      
      <MessageList messages={match.messages} partner={partner} />
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};