import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Message } from '../../contexts/MatchContext';

interface MessageListProps {
  messages: Message[];
  partner: any;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, partner }) => {
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!currentUser) return null;
  
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500 p-4 text-center">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map(message => {
            const isOwnMessage = message.senderId === currentUser.id;
            return (
              <div 
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                {!isOwnMessage && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                    <img 
                      src={partner.avatar} 
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div 
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    isOwnMessage 
                      ? 'bg-primary-500 text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <span className={`text-xs ${isOwnMessage ? 'text-primary-100' : 'text-gray-500'} block mt-1`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};