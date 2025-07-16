import React from 'react';
import { Clock } from 'lucide-react';
import { useMatch } from '../contexts/MatchContext';
import { useAuth } from '../contexts/AuthContext';
import { MatchCard } from '../components/matches/MatchCard';

export const MatchesPage: React.FC = () => {
  const { matches, getMatchRestaurant, getMatchPartner } = useMatch();
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  // Sort matches: most recent first
  const sortedMatches = [...matches].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Filter out expired matches
  const currentDate = new Date();
  const activeMatches = sortedMatches.filter(match => new Date(match.expiresAt) > currentDate);
  const expiredMatches = sortedMatches.filter(match => new Date(match.expiresAt) <= currentDate);
  
  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Active Matches</h2>
      <p className="text-gray-600 text-sm mb-4">Restaurants that both you and your partner liked</p>
      
      {activeMatches.length === 0 ? (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No active matches</h3>
          <p className="text-gray-600">Start swiping to find restaurants you both love!</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {activeMatches.map(match => {
            const restaurant = getMatchRestaurant(match.id);
            const partner = getMatchPartner(match.id);
            if (!restaurant || !partner) return null;
            
            return (
              <MatchCard 
                key={match.id}
                match={match}
                restaurant={restaurant}
                partner={partner}
              />
            );
          })}
        </div>
      )}
      
      {expiredMatches.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-900 mb-1 mt-8">Expired Matches</h2>
          <p className="text-gray-600 text-sm mb-4">These matches have expired after 3 days</p>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 opacity-60">
            {expiredMatches.map(match => {
              const restaurant = getMatchRestaurant(match.id);
              const partner = getMatchPartner(match.id);
              if (!restaurant || !partner) return null;
              
              return (
                <MatchCard 
                  key={match.id}
                  match={match}
                  restaurant={restaurant}
                  partner={partner}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};