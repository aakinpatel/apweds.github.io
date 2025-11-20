
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Coffee } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const WeddingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Namaste! I'm ChaiGPT. I can help you with Aakin & Palak's wedding schedule, Sangeet details, or dress codes. How can I assist?",
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);

    const botMsg: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Callout Bubble - Only show when closed */}
      {!isOpen && (
        <div className="fixed bottom-8 right-24 z-40 animate-fade-in-up hidden md:block">
          <div className="bg-white text-wedding-800 px-5 py-3 rounded-lg shadow-xl border border-wedding-200 text-sm font-serif font-medium relative transform transition-transform hover:scale-105 cursor-pointer" onClick={() => setIsOpen(true)}>
            Ask ChaiGPT about the wedding...
            {/* Triangle arrow */}
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white border-b-8 border-b-transparent"></div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 ${
          isOpen ? 'bg-wedding-500 rotate-90' : 'bg-wedding-800 hover:bg-wedding-700'
        } text-white border-2 border-wedding-300`}
        aria-label="Toggle Wedding Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-xl shadow-2xl z-50 border border-wedding-200 flex flex-col overflow-hidden animate-fade-in-up h-[500px]">
          
          {/* Header */}
          <div className="bg-wedding-900 p-4 flex items-center gap-3 text-white border-b-4 border-wedding-500 relative overflow-hidden">
             {/* Subtle pattern overlay for header */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>
            
            <div className="w-10 h-10 bg-wedding-700 rounded-full flex items-center justify-center border border-wedding-400 relative z-10 shadow-inner">
              <Coffee size={18} className="text-wedding-300" />
            </div>
            <div className="relative z-10">
              <h3 className="font-serif font-medium text-xl leading-tight text-wedding-50">ChaiGPT</h3>
              <p className="text-[10px] text-wedding-200 opacity-80 font-sans uppercase tracking-wider">Fueled by Masala Chai</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-wedding-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed font-sans shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-wedding-700 text-white rounded-br-none'
                      : 'bg-white border border-wedding-200 text-wedding-900 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-wedding-200 p-3 rounded-xl rounded-bl-none shadow-sm flex gap-1">
                  <span className="w-2 h-2 bg-wedding-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-wedding-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-wedding-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-wedding-100">
            <div className="flex gap-2 items-center bg-wedding-50 rounded-full px-4 py-2 border border-wedding-200 focus-within:border-wedding-500 focus-within:ring-1 focus-within:ring-wedding-200 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask ChaiGPT..."
                className="flex-1 bg-transparent outline-none text-wedding-800 text-sm placeholder-wedding-400 font-sans"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-wedding-600 hover:text-wedding-800 disabled:opacity-40 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeddingBot;
