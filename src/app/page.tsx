import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo placeholder - replace with actual logo */}
          <div className="mb-6 relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 bg-[var(--primary)] rounded-full opacity-20 animate-pulse"></div>
            <h1 className="text-6xl font-bold relative z-10 pt-16">
              <span className="text-[var(--foreground)]">Swipe</span>
              <span className="text-[var(--primary)]">U</span>
            </h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            College Connections Made Simple
          </h2>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Find relationships, friendships, roommates, or study buddies.
            Built by students, for students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="paw-button bg-[var(--primary)] text-white px-8 py-3 rounded-full font-medium text-lg shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <span>Get Started</span>
              <span className="ml-2">🐾</span>
            </Link>
            
            <Link 
              href="/auth/login" 
              className="border border-[var(--primary)] text-[var(--foreground)] px-8 py-3 rounded-full font-medium text-lg hover:bg-[var(--primary-light)] hover:text-[var(--accent)]"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
      
      {/* Features Section */}
      <section className="py-16 bg-[var(--primary-light)] dark:bg-[var(--accent)]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-[var(--primary)]">How SwipeU Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Create Your Profile</h3>
              <p className="text-center">Share your interests, major, class year, and what you're looking for.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🐾</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Find Your Match</h3>
              <p className="text-center">Swipe, like, or superlike to find your perfect connection on campus.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Connect</h3>
              <p className="text-center">Message your matches and build meaningful campus connections.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[var(--accent)] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">© 2024 SwipeU - All Rights Reserved</p>
          <p className="text-sm">Created with 🐾 for college students</p>
        </div>
      </footer>
    </div>
  );
}
