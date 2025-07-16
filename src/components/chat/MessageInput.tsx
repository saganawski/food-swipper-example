import React, { useState } from 'react';
import { Send, PlusCircle } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white border-t border-gray-200 px-4 py-3"
    >
      <div className="flex items-center">
        <button 
          type="button"
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Add attachment"
        >
          <PlusCircle size={22} />
        </button>
        
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <button 
          type="submit"
          disabled={!message.trim()}
          className={`p-2 rounded-full ${
            message.trim() 
              ? 'bg-primary-500 text-white hover:bg-primary-600' 
              : 'bg-gray-200 text-gray-400'
          } transition-colors`}
          aria-label="Send message"
        >
          <Send size={22} />
        </button>
      </div>
    </form>
  );
};