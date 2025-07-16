import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, MessageCircle, User } from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-6 py-3 z-10">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <NavItem to="/" icon={<Home size={24} />} label="Discover" />
        <NavItem to="/matches" icon={<Heart size={24} />} label="Matches" />
        <NavItem to="/chat/match_1" icon={<MessageCircle size={24} />} label="Chat" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex flex-col items-center px-2 py-1 rounded-md transition-colors
        ${isActive 
          ? 'text-primary-500' 
          : 'text-gray-500 hover:text-primary-500 hover:bg-gray-50'
        }
      `}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
};