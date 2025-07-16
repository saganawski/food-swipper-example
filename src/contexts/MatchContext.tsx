import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { mockMatches, mockUsers, mockRestaurants } from '../data/mockData';

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Match {
  id: string;
  restaurantId: string;
  users: string[];
  createdAt: Date;
  expiresAt: Date;
  messages: Message[];
}

interface MatchContextType {
  matches: Match[];
  getMatch: (matchId: string) => Match | undefined;
  getMatchRestaurant: (matchId: string) => any;
  getMatchPartner: (matchId: string) => any;
  sendMessage: (matchId: string, text: string) => void;
  checkForNewMatches: () => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);

  // Load matches when user changes
  useEffect(() => {
    if (currentUser) {
      // Filter matches that involve the current user
      const userMatches = mockMatches.filter(match => 
        match.users.includes(currentUser.id)
      );
      setMatches(userMatches);
    } else {
      setMatches([]);
    }
  }, [currentUser]);

  const getMatch = (matchId: string) => {
    return matches.find(match => match.id === matchId);
  };

  const getMatchRestaurant = (matchId: string) => {
    const match = getMatch(matchId);
    if (!match) return null;
    
    return mockRestaurants.find(r => r.id === match.restaurantId);
  };

  const getMatchPartner = (matchId: string) => {
    const match = getMatch(matchId);
    if (!match || !currentUser) return null;
    
    const partnerId = match.users.find(id => id !== currentUser.id);
    if (!partnerId) return null;
    
    return mockUsers.find(u => u.id === partnerId);
  };

  const sendMessage = (matchId: string, text: string) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      matchId,
      senderId: currentUser.id,
      text,
      timestamp: new Date()
    };
    
    setMatches(prevMatches => 
      prevMatches.map(match => 
        match.id === matchId 
          ? { ...match, messages: [...match.messages, newMessage] }
          : match
      )
    );
  };

  const checkForNewMatches = () => {
    if (!currentUser) return;
    
    // Demo: Create a new match with a random restaurant
    const availableRestaurants = mockRestaurants.filter(restaurant => 
      !matches.some(match => match.restaurantId === restaurant.id)
    );
    
    if (availableRestaurants.length === 0) return;
    
    const randomRestaurant = availableRestaurants[Math.floor(Math.random() * availableRestaurants.length)];
    const partnerId = currentUser.partnerId || 'user_2'; // Default to user_2 if no partner
    
    const newMatch: Match = {
      id: `match_${Date.now()}`,
      restaurantId: randomRestaurant.id,
      users: [currentUser.id, partnerId],
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      messages: []
    };
    
    setMatches(prevMatches => [newMatch, ...prevMatches]);
    
    // Show a brief notification (you could enhance this with a toast notification)
    console.log(`New match created: ${randomRestaurant.name}!`);
  };

  const value = {
    matches,
    getMatch,
    getMatchRestaurant,
    getMatchPartner,
    sendMessage,
    checkForNewMatches
  };

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
};