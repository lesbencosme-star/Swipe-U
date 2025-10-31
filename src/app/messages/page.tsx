'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample matches data
const sampleMatches = [
  {
    id: '1',
    name: 'Alex',
    lastMessage: 'Hey, do you want to study together tomorrow?',
    time: '10 min ago',
    unread: true,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
    online: true,
  },
  {
    id: '3',
    name: 'Taylor',
    lastMessage: 'I liked your photography work. Very impressive!',
    time: '2 hours ago',
    unread: false,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop',
    online: false,
  },
  {
    id: '5',
    name: 'Morgan',
    lastMessage: 'What time would you prefer to meet for coffee?',
    time: 'Yesterday',
    unread: false,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    online: true,
  },
];

// Emoji picker options
const emojiOptions = ['👋', '😊', '👍', '❤️', '🙌', '😂', '🔥', '🎉', '👏', '🤔'];

export default function MessagesPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const [conversations, setConversations] = useState<Record<string, {text: string, sent: boolean, time: string, read?: boolean}[]>>({
    '1': [
      { text: 'Hey, do you want to study together tomorrow?', sent: false, time: '10:15 AM' },
      { text: 'Sure, what time works for you?', sent: true, time: '10:17 AM', read: true },
    ],
    '3': [
      { text: 'I liked your photography work. Very impressive!', sent: false, time: '2:30 PM' },
    ],
    '5': [
      { text: 'Hi there! Would you like to grab coffee sometime?', sent: true, time: 'Yesterday, 4:30 PM', read: true },
      { text: 'That sounds great!', sent: false, time: 'Yesterday, 5:15 PM' },
      { text: 'What time would you prefer to meet for coffee?', sent: false, time: 'Yesterday, 5:16 PM' },
    ],
  });
  
  const selectedMatch = sampleMatches.find(match => match.id === selectedMatchId);
  const selectedConversation = selectedMatchId ? conversations[selectedMatchId] || [] : [];
  
  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);
  
  // Simulate typing indicator for demo purposes
  useEffect(() => {
    if (selectedMatchId) {
      const timeoutId = setTimeout(() => {
        setIsTyping(Math.random() > 0.7);
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [selectedMatchId, selectedConversation]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMatchId || !messageText.trim()) return;
    
    // Add the new message to the conversation
    const newMessage = { 
      text: messageText, 
      sent: true, 
      time: formatCurrentTime()
    };
    
    setConversations(prev => ({
      ...prev,
      [selectedMatchId]: [...(prev[selectedMatchId] || []), newMessage]
    }));
    
    // Clear input field and emoji picker
    setMessageText('');
    setShowEmojiPicker(false);
    
    // Simulate a reply after a random delay
    if (Math.random() > 0.3) {
      simulateReply(selectedMatchId);
    }
  };
  
  const formatCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const simulateReply = (matchId: string) => {
    // Generate a random reply delay between 1-3 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000;
    
    // Show typing indicator
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Random replies
      const replies = [
        "That sounds great!",
        "I'm not sure, can I let you know later?",
        "Yes, definitely!",
        "I'd love to!",
        "Let me think about it 🤔",
        "Perfect!",
        "👍 Cool",
        "See you then!"
      ];
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      // Add the reply to the conversation
      const replyMessage = { 
        text: randomReply, 
        sent: false, 
        time: formatCurrentTime()
      };
      
      setConversations(prev => ({
        ...prev,
        [matchId]: [...(prev[matchId] || []), replyMessage]
      }));
    }, delay);
  };
  
  const addEmoji = (emoji: string) => {
    setMessageText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center py-8">
          <span className="text-[var(--foreground)]">Your </span>
          <span className="text-[var(--primary)]">Messages</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 h-[75vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Match List Sidebar */}
          <div className="col-span-1 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-bold text-lg">Matches</h2>
            </div>
            
            {sampleMatches.map(match => (
              <div 
                key={match.id}
                onClick={() => setSelectedMatchId(match.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  selectedMatchId === match.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={match.imageUrl}
                    alt={match.name}
                    fill
                    className="object-cover"
                  />
                  {match.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{match.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{match.time}</span>
                  </div>
                  
                  <p className={`text-sm truncate ${match.unread ? 'font-semibold text-[var(--foreground)]' : 'text-gray-500 dark:text-gray-400'}`}>
                    {match.lastMessage}
                  </p>
                </div>
                
                {match.unread && (
                  <div className="w-3 h-3 bg-[var(--primary)] rounded-full"></div>
                )}
              </div>
            ))}
            
            <div className="p-4 text-center">
              <Link
                href="/matching"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm font-medium"
              >
                Find more matches
              </Link>
            </div>
          </div>
          
          {/* Message Area */}
          <div className="col-span-2 flex flex-col h-full">
            {selectedMatch ? (
              <>
                {/* Message Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={selectedMatch.imageUrl}
                      alt={selectedMatch.name}
                      fill
                      className="object-cover"
                    />
                    {selectedMatch.online && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium">{selectedMatch.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedMatch.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                {/* Message List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.map((message, index) => (
                    <div 
                      key={index}
                      className={`max-w-[70%] ${
                        message.sent ? 'ml-auto' : ''
                      }`}
                    >
                      <div 
                        className={`p-3 rounded-lg ${
                          message.sent 
                            ? 'bg-[var(--primary)] text-white rounded-br-none' 
                            : 'bg-gray-100 dark:bg-gray-700 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className={`flex text-xs text-gray-500 mt-1 ${
                        message.sent ? 'justify-end' : ''
                      }`}>
                        <span>{message.time}</span>
                        {message.sent && (
                          <span className="ml-2">
                            {message.read ? (
                              <span title="Read">✓✓</span>
                            ) : (
                              <span title="Sent">✓</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="max-w-[70%]">
                      <div className="bg-gray-100 dark:bg-gray-700 py-2 px-4 rounded-lg inline-flex space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messageEndRef} />
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  {showEmojiPicker && (
                    <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {emojiOptions.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => addEmoji(emoji)}
                          className="text-xl hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      😊
                    </button>
                    
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-[var(--primary)] focus:outline-none bg-white dark:bg-gray-800"
                    />
                    
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className={`paw-button bg-[var(--primary)] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center ${
                        !messageText.trim() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="text-lg">▶</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-[var(--primary-light)] rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">💬</span>
                </div>
                <h2 className="text-xl font-bold mb-2">Your Messages</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                  Select a conversation or match with more people to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 