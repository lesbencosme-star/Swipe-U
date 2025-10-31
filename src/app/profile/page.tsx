import UserProfileForm from '../components/UserProfileForm';

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-[var(--foreground)]">Create Your </span>
          <span className="text-[var(--primary)]">SwipeU </span>
          <span className="text-[var(--foreground)]">Profile</span>
        </h1>
        
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Tell us about yourself so we can help you connect with people who share your interests.
        </p>
        
        <UserProfileForm />
      </div>
    </div>
  );
} 