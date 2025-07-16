# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the built application locally

## Architecture Overview

This is a React-based food swiper application built with Vite, TypeScript, and Tailwind CSS. The app allows users to swipe through local restaurants and match with partners to find dining options together.

### Core Architecture Patterns

**Context-Based State Management**: The app uses React Context for global state management across three main domains:
- `AuthContext` - User authentication and partner linking
- `SwipeContext` - Restaurant swiping logic and match detection
- `MatchContext` - Managing matched restaurants and chat functionality

**Mock Data Layer**: All data is simulated using mock objects in `src/data/mockData.ts` including users, restaurants, and matches. The app uses localStorage for persistence in demo mode.

**Component Structure**:
- `pages/` - Top-level route components (SwipePage, MatchesPage, ChatPage, etc.)
- `components/` - Organized by feature domain (auth/, chat/, layout/, matches/, profile/, swipe/)
- `contexts/` - React Context providers for state management

### Key Implementation Details

**Authentication Flow**: The app simulates authentication using localStorage and accepts any email/password combination. Social login (Google/Facebook/Apple) is mocked.

**Swiping Logic**: Located in `SwipeContext.tsx`, implements a simple index-based system through restaurants array. Matches are artificially created every third swipe for demo purposes.

**Routing**: Uses React Router with a protected route pattern - all main features require authentication except the login page.

**Styling**: Uses Tailwind CSS with custom primary colors. Component styling follows utility-first patterns.

## Key Files and Locations

- `src/App.tsx` - Main app component with route configuration and context providers
- `src/contexts/` - All global state management logic
- `src/data/mockData.ts` - All mock data definitions
- `src/pages/SwipePage.tsx` - Core swiping interface implementation
- `vite.config.ts` - Build configuration with React plugin

## Demo App Behavior

This is a demonstration app where:
- Any login credentials are accepted
- Matches occur automatically every 3 swipes regardless of like/dislike
- All data persists only in localStorage
- Restaurant data is shuffled on each session
- Partner linking is simulated through user ID references