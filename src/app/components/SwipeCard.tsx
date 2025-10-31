'use client';

import { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import Image from 'next/image';

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: string;
  major: string;
  classYear: string;
  profileType: string[];
  interests: string[];
  bio?: string;
  imageUrl: string;
  similarity?: number;
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'up', profileId: string) => void;
  onProfileView: (profileId: string) => void;
}

export default function SwipeCard({ profile, onSwipe, onProfileView }: SwipeCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Set up the spring for the card animation
  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    config: { mass: 1, tension: 500, friction: 50 }
  }));
  
  // Set up the gesture handler
  const bind = useDrag(
    ({ down, movement: [mx, my], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      
      // If the user released the card and it moved fast enough
      if (!down && trigger) {
        // If swiped far enough left, it's a "skip"
        if (dir < 0) {
          api.start({ x: -500, rotate: -15 });
          onSwipe('left', profile.id);
        }
        // If swiped far enough right, it's a "like"
        else if (dir > 0 && Math.abs(my) < 100) {
          api.start({ x: 500, rotate: 15 });
          onSwipe('right', profile.id);
        }
        // If swiped up, it's a "superlike"
        else if (my < -50) {
          api.start({ y: -500, rotate: 0 });
          onSwipe('up', profile.id);
        }
      }
      // If the user is still dragging or didn't swipe far enough
      else {
        // Move the card with the drag
        api.start({
          x: down ? mx : 0,
          y: down ? my : 0,
          rotate: down ? mx / 20 : 0
        });
      }
    }
  );
  
  const toggleDetails = () => {
    setIsDetailOpen(!isDetailOpen);
    if (!isDetailOpen) {
      onProfileView(profile.id);
    }
  };
  
  return (
    <animated.div
      className="absolute top-0 left-0 right-0 w-full h-[500px] max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden touch-none"
      style={{ x, y, rotate, touchAction: 'none', zIndex: 1 }}
      {...bind()}
    >
      <div className="relative w-full h-full">
        {/* Profile Image */}
        <div className="relative h-2/3">
          <Image
            src={profile.imageUrl}
            alt={`${profile.name}'s profile`}
            fill
            className="object-cover"
          />
          
          {/* Similarity Badge (if available) */}
          {profile.similarity !== undefined && (
            <div className="absolute top-3 right-3 bg-[var(--primary)] text-white px-2 py-1 rounded-full text-sm font-medium">
              {profile.similarity}% Match
            </div>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="absolute bottom-0 w-full bg-white dark:bg-gray-800 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">{profile.name}, {profile.age}</h2>
            <button
              onClick={toggleDetails}
              className="text-[var(--primary)] hover:text-[var(--primary-dark)]"
              aria-label="View profile details"
            >
              {isDetailOpen ? '▲' : '▼'}
            </button>
          </div>
          
          <div className="text-gray-600 dark:text-gray-400 mb-2">
            {profile.major}, {profile.classYear}
          </div>
          
          {/* Looking For Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {profile.profileType.map((type, index) => (
              <span 
                key={index}
                className="bg-[var(--primary-light)] text-[var(--accent)] text-xs px-2 py-1 rounded-full"
              >
                {type === 'relationship' && '❤️ Relationship'}
                {type === 'friendship' && '👋 Friendship'}
                {type === 'roommate' && '🏠 Roommate'}
                {type === 'study' && '📚 Study Buddy'}
              </span>
            ))}
          </div>
          
          {/* Expanded Details */}
          {isDetailOpen && (
            <div className="mt-3 border-t pt-3 border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2">Interests</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {profile.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              
              {profile.bio && (
                <>
                  <h3 className="font-medium mb-2">Bio</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{profile.bio}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Swipe Indicators */}
      <div 
        className={`absolute top-1/3 left-4 bg-red-500 p-2 rounded-full opacity-0 transition-opacity ${
          x.to(x => x < -50 ? 'opacity-70' : 'opacity-0')
        }`}
      >
        <span className="text-white text-2xl font-bold">X</span>
      </div>
      
      <div 
        className={`absolute top-1/3 right-4 bg-green-500 p-2 rounded-full opacity-0 transition-opacity ${
          x.to(x => x > 50 ? 'opacity-70' : 'opacity-0')
        }`}
      >
        <span className="text-white text-2xl">🐾</span>
      </div>
      
      <div 
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-[var(--primary)] p-2 rounded-full opacity-0 transition-opacity ${
          y.to(y => y < -50 ? 'opacity-70' : 'opacity-0')
        }`}
      >
        <span className="text-white text-2xl">🦴</span>
      </div>
    </animated.div>
  );
} 