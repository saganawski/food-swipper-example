import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockRestaurants } from '../data/mockData';
import { useAuth } from './AuthContext';
import { useMatch } from './MatchContext';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  priceLevel: number;
  cuisine: string;
  distance: string;
  address: string;
  description: string;
}

interface SwipeContextType {
  currentRestaurant: Restaurant | null;
  likedRestaurants: string[];
  dislikedRestaurants: string[];
  loading: boolean;
  showMatchNotification: boolean;
  matchedRestaurant: Restaurant | null;
  like: () => void;
  dislike: () => void;
  resetSwipes: () => void;
  dismissMatchNotification: () => void;
}

const SwipeContext = createContext<SwipeContextType | undefined>(undefined);

export const useSwipe = () => {
  const context = useContext(SwipeContext);
  if (context === undefined) {
    throw new Error('useSwipe must be used within a SwipeProvider');
  }
  return context;
};

export const SwipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const { checkForNewMatches } = useMatch();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedRestaurants, setLikedRestaurants] = useState<string[]>([]);
  const [dislikedRestaurants, setDislikedRestaurants] = useState<string[]>([]);
  const [swipeCount, setSwipeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [matchedRestaurant, setMatchedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    // Simulate fetching restaurants
    setLoading(true);
    setTimeout(() => {
      // Shuffle the restaurants array to get different order each time
      const shuffled = [...mockRestaurants].sort(() => 0.5 - Math.random());
      setRestaurants(shuffled);
      setCurrentIndex(0);
      setLoading(false);
    }, 1000);
  }, [currentUser]);

  // Load saved likes/dislikes from localStorage
  useEffect(() => {
    if (currentUser) {
      const savedLikes = localStorage.getItem(`foodswipe_likes_${currentUser.id}`);
      const savedDislikes = localStorage.getItem(`foodswipe_dislikes_${currentUser.id}`);
      
      if (savedLikes) setLikedRestaurants(JSON.parse(savedLikes));
      if (savedDislikes) setDislikedRestaurants(JSON.parse(savedDislikes));
    }
  }, [currentUser]);

  // Save likes/dislikes to localStorage when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`foodswipe_likes_${currentUser.id}`, JSON.stringify(likedRestaurants));
      localStorage.setItem(`foodswipe_dislikes_${currentUser.id}`, JSON.stringify(dislikedRestaurants));
    }
  }, [likedRestaurants, dislikedRestaurants, currentUser]);

  const currentRestaurant = restaurants.length > 0 && currentIndex < restaurants.length 
    ? restaurants[currentIndex] 
    : null;

  const like = () => {
    if (currentRestaurant) {
      setLikedRestaurants([...likedRestaurants, currentRestaurant.id]);
      setSwipeCount(prev => prev + 1);
      
      // Demo: Create a match every third swipe
      if ((swipeCount + 1) % 3 === 0) {
        setMatchedRestaurant(currentRestaurant);
        setShowMatchNotification(true);
        checkForNewMatches();
      }
      
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const dislike = () => {
    if (currentRestaurant) {
      setDislikedRestaurants([...dislikedRestaurants, currentRestaurant.id]);
      setSwipeCount(prev => prev + 1);
      
      // Demo: Create a match every third swipe (even on dislikes for demo purposes)
      if ((swipeCount + 1) % 3 === 0) {
        setMatchedRestaurant(currentRestaurant);
        setShowMatchNotification(true);
        checkForNewMatches();
      }
      
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const resetSwipes = () => {
    setLikedRestaurants([]);
    setDislikedRestaurants([]);
    setSwipeCount(0);
    setCurrentIndex(0);
    setShowMatchNotification(false);
    setMatchedRestaurant(null);
  };

  const dismissMatchNotification = () => {
    setShowMatchNotification(false);
    setMatchedRestaurant(null);
  };

  const value = {
    currentRestaurant,
    likedRestaurants,
    dislikedRestaurants,
    loading,
    showMatchNotification,
    matchedRestaurant,
    like,
    dislike,
    resetSwipes,
    dismissMatchNotification
  };

  return <SwipeContext.Provider value={value}>{children}</SwipeContext.Provider>;
};