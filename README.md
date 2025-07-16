# FoodSwipe 🍽️

A social restaurant discovery app that helps friends and partners find dining experiences together. Swipe through local restaurants and match with your dining partner to discover where to eat next!

## 🚀 Features

### Core Functionality
- **Restaurant Swiping**: Browse through curated local restaurants with a Tinder-like interface
- **Partner Matching**: Connect with friends or partners to find mutual dining preferences
- **Real-time Chat**: Discuss restaurant choices and coordinate plans through integrated messaging
- **Smart Matching**: Automatically detect when both users like the same restaurant
- **Restaurant Details**: View detailed information including cuisine type, ratings, price level, and location

### User Experience
- **Intuitive Interface**: Clean, mobile-first design with smooth animations
- **Social Authentication**: Mock login system supporting email/password and social providers
- **Persistent Sessions**: Your preferences and matches are saved locally
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router v6 for single-page navigation
- **Icons**: Lucide React for beautiful, consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Context API for global state
- **Code Quality**: ESLint with TypeScript support

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-swipper-app/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the built application locally

## 🎯 Demo Features

This is a **demonstration application** designed to showcase the potential of a food discovery platform. Key demo characteristics:

- **Mock Authentication**: Any email/password combination will work for login
- **Simulated Matching**: Matches occur automatically every 3rd swipe for demo purposes
- **Sample Data**: Pre-loaded with diverse restaurant options across multiple cuisines
- **Local Storage**: All data persists in browser storage (no backend required)
- **Partner Simulation**: Demonstrates partner linking and collaborative decision making

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── chat/            # Messaging interface
│   ├── layout/          # App layout and navigation
│   ├── matches/         # Match display components
│   ├── profile/         # User profile components
│   └── swipe/           # Restaurant swiping interface
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # User authentication state
│   ├── MatchContext.tsx # Match management
│   └── SwipeContext.tsx # Swiping logic and restaurant data
├── data/                # Mock data and type definitions
├── pages/               # Top-level route components
└── App.tsx              # Main application component
```

## 🔧 Key Components

### Authentication System
- Mock login accepting any credentials
- Social login simulation (Google, Facebook, Apple)
- Protected routes ensuring authenticated access
- User profile management with partner linking

### Restaurant Discovery
- Curated restaurant database with real-world details
- Advanced filtering by cuisine, price, and distance
- Rich restaurant profiles with images and descriptions
- Location-based sorting and recommendations

### Matching Algorithm
- Real-time match detection when both users like a restaurant
- Match expiration system to encourage timely decisions
- Visual match notifications with celebration animations
- Comprehensive match history and management

### Communication Platform
- Restaurant-specific chat rooms for each match
- Real-time messaging simulation with timestamp tracking
- Message persistence across sessions
- User-friendly chat interface with typing indicators

## 🎨 Design Philosophy

- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Intuitive UX**: Familiar swiping mechanics reduce learning curve
- **Visual Appeal**: High-quality restaurant imagery and clean typography
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized bundle size and fast loading times

## 🚀 Potential Enhancements

This demo showcases the foundation for a full-featured application. Future development could include:

- **Backend Integration**: Real user accounts and restaurant APIs
- **Advanced Matching**: Machine learning for personalized recommendations
- **Social Features**: Friend networks and group dining coordination
- **Reservation System**: Direct integration with restaurant booking platforms
- **Reviews & Ratings**: User-generated content and recommendation engine
- **Geolocation**: Real-time location-based restaurant discovery
- **Push Notifications**: Match alerts and dining reminders

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a demonstration project showcasing potential functionality. While not actively maintained for production use, the codebase serves as an excellent reference for:

- React application architecture patterns
- Context-based state management
- TypeScript implementation best practices
- Modern frontend development workflows
- Mobile-responsive design principles

---

**Note**: This application is designed for demonstration purposes as part of a marketing showcase. The focus is on user experience and interface design rather than production-ready backend functionality.