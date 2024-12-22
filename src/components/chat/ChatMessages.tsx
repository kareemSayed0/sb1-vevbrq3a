import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  onAction: (action: string) => void;
}

export function ChatMessages({ messages, onAction }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {messages.map((message) => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          onAction={onAction}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}