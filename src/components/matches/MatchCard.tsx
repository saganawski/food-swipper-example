import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle } from 'lucide-react';
import { Match } from '../../contexts/MatchContext';

interface MatchCardProps {
  match: Match;
  restaurant: any;
  partner: any;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, restaurant, partner }) => {
  // Calculate days remaining until expiration
  const now = new Date();
  const expiresAt = new Date(match.expiresAt);
  const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  const isExpiring = daysRemaining <= 1;
  const hasExpired = daysRemaining <= 0;

  return (
    <Link 
      to={`/chat/${match.id}`}
      className="block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="h-40 relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-xl">{restaurant.name}</h3>
          <p className="text-sm text-white/90">{restaurant.cuisine} • {restaurant.priceLevel === 1 ? '$' : restaurant.priceLevel === 2 ? '$$' : restaurant.priceLevel === 3 ? '$$$' : '$$$$'}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img 
                src={partner.avatar} 
                alt={partner.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-gray-800">Matched with {partner.name}</span>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-1" />
            {hasExpired ? (
              <span className="text-gray-500">Expired</span>
            ) : (
              <span className={isExpiring ? 'text-red-500 font-medium' : ''}>
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
              </span>
            )}
          </div>
          
          <div className="flex items-center text-primary-500">
            <MessageCircle size={16} className="mr-1" />
            <span>{match.messages.length} messages</span>
          </div>
        </div>
      </div>
    </Link>
  );
};