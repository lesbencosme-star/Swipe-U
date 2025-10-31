'use client';

import { useState, useEffect } from 'react';
import SwipeCard from '../components/SwipeCard';
import MatchConfirmation from '../components/MatchConfirmation';
import Link from 'next/link';

// Sample profiles data
const sampleProfiles = [
  {
    id: '1',
    name: 'Alex',
    age: 21,
    gender: 'male',
    major: 'Computer Science',
    classYear: 'Junior',
    profileType: ['friendship', 'study'],
    interests: ['Coding', 'Hiking', 'Chess', 'Video Games'],
    bio: 'Looking for study partners for algorithms and data structures. Also enjoy hiking on weekends!',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
    similarity: 87
  },
  {
    id: '2',
    name: 'Jamie',
    age: 20,
    gender: 'female',
    major: 'Psychology',
    classYear: 'Sophomore',
    profileType: ['friendship', 'roommate'],
    interests: ['Reading', 'Yoga', 'Coffee', 'Art'],
    bio: 'Early riser, clean and organized. Looking for a roommate who respects quiet study time.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop',
    similarity: 75
  },
  {
    id: '3',
    name: 'Taylor',
    age: 22,
    gender: 'non-binary',
    major: 'Marketing',
    classYear: 'Senior',
    profileType: ['relationship', 'friendship'],
    interests: ['Music', 'Photography', 'Travel', 'Social Media'],
    bio: 'Creative person looking to connect with other artistic minds on campus.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop',
    similarity: 92
  },
  {
    id: '4',
    name: 'Jordan',
    age: 19,
    gender: 'male',
    major: 'Sports Science',
    classYear: 'Freshman',
    profileType: ['friendship', 'study'],
    interests: ['Basketball', 'Fitness', 'Nutrition', 'Gaming'],
    bio: 'Student athlete looking for study buddies and gym partners.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    similarity: 68
  },
  {
    id: '5',
    name: 'Morgan',
    age: 21,
    gender: 'female',
    major: 'Biology',
    classYear: 'Junior',
    profileType: ['roommate', 'friendship'],
    interests: ['Animals', 'Netflix', 'Running', 'Cooking'],
    bio: 'Pre-med student who loves cooking and sharing meals. Looking for a roommate for next semester.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    similarity: 81
  }
];

// User's own profile image
const userImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop';

export default function MatchingPage() {
  const [profiles, setProfiles] = useState(sampleProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [currentMatch, setCurrentMatch] = useState<typeof sampleProfiles[0] | null>(null);
  const [showMatchConfirmation, setShowMatchConfirmation] = useState(false);
  
  const handleSwipe = (direction: 'left' | 'right' | 'up', profileId: string) => {
    // Handle different swipe directions
    if (direction === 'right') {
      // Regular like
      console.log('Liked', profileId);
      // For demo purposes, randomly create matches (with higher probability)
      if (Math.random() > 0.3) {
        handleMatch(profileId);
      }
    } else if (direction === 'up') {
      // Superlike
      console.log('Superliked', profileId);
      // Higher chance of match with superlike
      if (Math.random() > 0.1) {
        handleMatch(profileId);
      }
    } else {
      // Skip
      console.log('Skipped', profileId);
    }
    
    // Move to next profile after a delay if not showing match confirmation
    if (!showMatchConfirmation) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    }
  };
  
  const handleMatch = (profileId: string) => {
    // Add to matches
    setMatches(prev => [...prev, profileId]);
    
    // Find the matched profile
    const matchedProfile = profiles.find(profile => profile.id === profileId);
    if (matchedProfile) {
      setCurrentMatch(matchedProfile);
      setShowMatchConfirmation(true);
    } else {
      // If for some reason we can't find the profile, just go to next
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    }
  };
  
  const handleCloseMatchConfirmation = () => {
    setShowMatchConfirmation(false);
    setCurrentMatch(null);
    
    // Move to next profile after match
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 100);
  };
  
  const handleProfileView = (profileId: string) => {
    console.log('Viewed profile details for', profileId);
  };
  
  const resetMatching = () => {
    setProfiles(sampleProfiles);
    setCurrentIndex(0);
    setMatches([]);
  };
  
  const currentProfile = profiles[currentIndex];
  const hasMoreProfiles = currentIndex < profiles.length;
  
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-[var(--foreground)]">Find Your </span>
          <span className="text-[var(--primary)]">Match</span>
        </h1>
        
        <div className="relative h-[580px] mb-8">
          {hasMoreProfiles ? (
            <>
              <SwipeCard
                profile={currentProfile}
                onSwipe={handleSwipe}
                onProfileView={handleProfileView}
              />
              
              {/* Control Buttons */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 p-4 z-10">
                <button 
                  onClick={() => handleSwipe('left', currentProfile.id)}
                  className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg text-red-500 text-2xl hover:bg-red-100"
                  aria-label="Skip"
                >
                  ✕
                </button>
                
                <button 
                  onClick={() => handleSwipe('up', currentProfile.id)}
                  className="bone-button w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg text-[var(--primary)] text-2xl hover:bg-[var(--primary-light)] border-2 border-[var(--primary)]"
                  aria-label="Super Like"
                >
                  🦴
                </button>
                
                <button 
                  onClick={() => handleSwipe('right', currentProfile.id)}
                  className="paw-button w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg text-green-500 text-2xl hover:bg-green-100"
                  aria-label="Like"
                >
                  🐾
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">No More Profiles</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You've gone through all available profiles! Check back later for more matches.
              </p>
              
              {matches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">
                    You've got {matches.length} match{matches.length > 1 ? 'es' : ''}!
                  </h3>
                  <Link 
                    href="/messages" 
                    className="bg-[var(--primary)] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg"
                  >
                    Go to Messages
                  </Link>
                </div>
              )}
              
              <button 
                onClick={resetMatching}
                className="mt-4 border border-[var(--primary)] text-[var(--foreground)] px-6 py-2 rounded-full font-medium hover:bg-[var(--primary-light)]"
              >
                Reset (Demo Only)
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Match Confirmation Modal */}
      {showMatchConfirmation && currentMatch && (
        <MatchConfirmation 
          match={currentMatch}
          userImage={userImage}
          onClose={handleCloseMatchConfirmation}
        />
      )}
    </div>
  );
} 