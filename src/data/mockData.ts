// Mock Users
export const mockUsers = [
  {
    id: 'user_1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400',
    partnerId: 'user_2'
  },
  {
    id: 'user_2',
    name: 'Taylor Williams',
    email: 'taylor@example.com',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    partnerId: 'user_1'
  },
  {
    id: 'user_3',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
    partnerId: null
  }
];

// Mock Restaurants
export const mockRestaurants = [
  {
    id: 'rest_1',
    name: 'Bella Italia',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    priceLevel: 2,
    cuisine: 'Italian',
    distance: '0.5 miles',
    address: '123 Main St, Anytown, USA',
    description: 'Authentic Italian cuisine with homemade pasta and wood-fired pizzas. Cozy atmosphere with outdoor seating available.'
  },
  {
    id: 'rest_2',
    name: 'Tokyo Sushi',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    priceLevel: 3,
    cuisine: 'Japanese',
    distance: '1.2 miles',
    address: '456 Oak Ave, Anytown, USA',
    description: 'Premium sushi and sashimi prepared by master chefs using the freshest ingredients. Elegant ambiance with traditional Japanese decor.'
  },
  {
    id: 'rest_3',
    name: 'Burger Joint',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.2,
    priceLevel: 1,
    cuisine: 'American',
    distance: '0.8 miles',
    address: '789 Elm St, Anytown, USA',
    description: 'Juicy gourmet burgers made with locally sourced grass-fed beef. Craft beers on tap and hand-cut fries.'
  },
  {
    id: 'rest_4',
    name: 'Spice Garden',
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    priceLevel: 2,
    cuisine: 'Indian',
    distance: '1.5 miles',
    address: '101 Spice Blvd, Anytown, USA',
    description: 'Authentic Indian cuisine featuring aromatic curries and tandoori specialties. Extensive vegetarian options available.'
  },
  {
    id: 'rest_5',
    name: 'El Mariachi',
    image: 'https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.4,
    priceLevel: 2,
    cuisine: 'Mexican',
    distance: '0.7 miles',
    address: '222 Fiesta Way, Anytown, USA',
    description: 'Vibrant Mexican restaurant serving traditional favorites and innovative specialties. Famous for their tableside guacamole and margaritas.'
  },
  {
    id: 'rest_6',
    name: 'Golden Dragon',
    image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.3,
    priceLevel: 2,
    cuisine: 'Chinese',
    distance: '1.1 miles',
    address: '333 Dragon Ln, Anytown, USA',
    description: 'Authentic Chinese cuisine from various regions of China. Specializing in dim sum and Peking duck.'
  },
  {
    id: 'rest_7',
    name: 'The Steakhouse',
    image: 'https://images.pexels.com/photos/1251196/pexels-photo-1251196.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    priceLevel: 4,
    cuisine: 'Steakhouse',
    distance: '2.0 miles',
    address: '444 Grill Ave, Anytown, USA',
    description: 'Premium steakhouse serving aged prime cuts. Elegant dining with an extensive wine list and sophisticated atmosphere.'
  },
  {
    id: 'rest_8',
    name: 'Mediterranean Delight',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    priceLevel: 2,
    cuisine: 'Mediterranean',
    distance: '1.3 miles',
    address: '555 Olive Way, Anytown, USA',
    description: 'Fresh Mediterranean cuisine with emphasis on seafood, olive oils, and fresh herbs. Beautiful patio with ocean views.'
  }
];

// Mock Matches
export const mockMatches = [
  {
    id: 'match_1',
    restaurantId: 'rest_1',
    users: ['user_1', 'user_2'],
    createdAt: new Date('2025-01-15T12:00:00Z'),
    expiresAt: new Date('2025-01-18T12:00:00Z'),
    messages: [
      {
        id: 'msg_1',
        matchId: 'match_1',
        senderId: 'user_1',
        text: 'How about dinner at Bella Italia tonight?',
        timestamp: new Date('2025-01-15T14:30:00Z')
      },
      {
        id: 'msg_2',
        matchId: 'match_1',
        senderId: 'user_2',
        text: 'Sounds great! I love their pasta!',
        timestamp: new Date('2025-01-15T14:45:00Z')
      }
    ]
  },
  {
    id: 'match_2',
    restaurantId: 'rest_3',
    users: ['user_1', 'user_2'],
    createdAt: new Date('2025-01-10T15:00:00Z'),
    expiresAt: new Date('2025-01-13T15:00:00Z'),
    messages: [
      {
        id: 'msg_3',
        matchId: 'match_2',
        senderId: 'user_2',
        text: 'Burger Joint has the best burgers in town!',
        timestamp: new Date('2025-01-10T16:20:00Z')
      },
      {
        id: 'msg_4',
        matchId: 'match_2',
        senderId: 'user_1',
        text: 'Definitely! Let\'s go there this weekend.',
        timestamp: new Date('2025-01-10T16:35:00Z')
      }
    ]
  }
];