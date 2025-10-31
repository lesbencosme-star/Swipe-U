'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(1); // For demo purposes
  const [newMatches, setNewMatches] = useState(2); // For demo purposes
  
  // Check if user is on auth pages
  const isAuthPage = pathname?.startsWith('/auth') || pathname === '/';
  
  // Simple client-side check to determine if user should see navigation
  // In a real app, this would be handled by a proper auth system
  useEffect(() => {
    // For demo purposes, consider user logged in if not on auth pages
    if (!isAuthPage && pathname !== '/') {
      setIsLoggedIn(true);
    }
  }, [pathname, isAuthPage]);
  
  // Reset notifications when visiting respective pages
  useEffect(() => {
    if (pathname?.startsWith('/messages')) {
      setUnreadMessages(0);
    }
    if (pathname?.startsWith('/matching')) {
      setNewMatches(0);
    }
  }, [pathname]);
  
  // Don't show navigation on auth pages
  if (isAuthPage) return null;
  
  return (
    <>
      {/* Mobile Navigation (Bottom) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden z-50">
        <div className="grid grid-cols-3 h-full">
          <Link 
            href="/profile" 
            className={`flex flex-col items-center justify-center ${
              pathname?.startsWith('/profile') ? 'text-[var(--primary)]' : 'text-gray-500'
            }`}
          >
            <span className="text-xl">👤</span>
            <span className="text-xs">Profile</span>
          </Link>
          
          <Link 
            href="/matching" 
            className={`flex flex-col items-center justify-center relative ${
              pathname?.startsWith('/matching') ? 'text-[var(--primary)]' : 'text-gray-500'
            }`}
          >
            <span className="text-xl">🐾</span>
            <span className="text-xs">Match</span>
            {newMatches > 0 && (
              <span className="absolute top-1 right-9 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {newMatches}
              </span>
            )}
          </Link>
          
          <Link 
            href="/messages" 
            className={`flex flex-col items-center justify-center relative ${
              pathname?.startsWith('/messages') ? 'text-[var(--primary)]' : 'text-gray-500'
            }`}
          >
            <span className="text-xl">💬</span>
            <span className="text-xs">Messages</span>
            {unreadMessages > 0 && (
              <span className="absolute top-1 right-9 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {unreadMessages}
              </span>
            )}
          </Link>
        </div>
      </nav>
      
      {/* Desktop Navigation (Top) */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold mr-8">
              <span className="text-[var(--foreground)]">Swipe</span>
              <span className="text-[var(--primary)]">U</span>
            </Link>
            
            <div className="flex gap-6">
              <Link 
                href="/profile" 
                className={`font-medium ${
                  pathname?.startsWith('/profile') 
                    ? 'text-[var(--primary)]' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Profile
              </Link>
              
              <Link 
                href="/matching" 
                className={`font-medium relative ${
                  pathname?.startsWith('/matching') 
                    ? 'text-[var(--primary)]' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Match
                {newMatches > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {newMatches}
                  </span>
                )}
              </Link>
              
              <Link 
                href="/messages" 
                className={`font-medium relative ${
                  pathname?.startsWith('/messages') 
                    ? 'text-[var(--primary)]' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Messages
                {unreadMessages > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadMessages}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
          {/* User menu */}
          <div className="flex items-center">
            <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm">
                {/* Placeholder for user avatar */}
                👤
              </div>
              <span className="text-sm font-medium">Me</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Add padding for mobile bottom nav or desktop top nav */}
      <div className="md:h-16 h-16 md:mb-0 mb-4"></div>
    </>
  );
} 