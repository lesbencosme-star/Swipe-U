'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MatchConfirmationProps {
  match: {
    id: string;
    name: string;
    imageUrl: string;
  };
  userImage: string;
  onClose: () => void;
}

export default function MatchConfirmation({ match, userImage, onClose }: MatchConfirmationProps) {
  const router = useRouter();
  const [confetti, setConfetti] = useState<Array<{ x: number; y: number; size: number; color: string }>>([]);
  
  // Generate confetti on mount
  useEffect(() => {
    const colors = ['#D4AF37', '#F2E6B6', '#A08623', '#ffffff'];
    const newConfetti = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setConfetti(newConfetti);
    
    // Play a sound if available
    const audio = new Audio('/sounds/match.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Sound play may fail if user hasn't interacted with the page yet
      console.log('Sound play failed - user may not have interacted with the page yet');
    });
  }, []);
  
  const handleMessage = () => {
    router.push(`/messages?id=${match.id}`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 animate-fade-in">
      {/* Confetti */}
      {confetti.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y - 20}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}
      
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl animate-scale-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-[var(--primary)]">It's a Match!</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You and {match.name} liked each other
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--primary)] transform -translate-x-4">
              <Image
                src={userImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop'}
                alt="Your profile"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--primary)] transform translate-x-4">
              <Image
                src={match.imageUrl}
                alt={`${match.name}'s profile`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleMessage}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-full font-medium shadow-md hover:shadow-lg"
            >
              Send a Message
            </button>
            
            <button
              onClick={onClose}
              className="w-full border border-[var(--primary)] text-[var(--foreground)] py-3 rounded-full font-medium hover:bg-[var(--primary-light)]"
            >
              Keep Swiping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 