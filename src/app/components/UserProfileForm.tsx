'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ProfileType = 'relationship' | 'friendship' | 'roommate' | 'study';
type ArrayPropertyName = 'interests' | 'clubs' | 'athletics' | 'profileType';

interface UserProfileFormProps {
  onSubmit?: (profileData: any) => void;
}

export default function UserProfileForm({ onSubmit }: UserProfileFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    // Basic Info
    name: '',
    age: '',
    gender: '',
    pronouns: '',
    major: '',
    classYear: '',
    
    // Profile Type
    profileType: [] as ProfileType[],
    
    // Additional Info
    clubs: [] as string[],
    athletics: [] as string[],
    interests: [] as string[],
    
    // Social Media
    instagram: '',
    snapchat: '',
    
    // Preferences
    sleepSchedule: '',
    socialPreferences: '',
    studyHabits: '',
    
    // Relationship Specific
    orientation: '',
    preferredAgeRange: { min: 18, max: 25 },
  });
  
  const [newInterest, setNewInterest] = useState('');
  const [newClub, setNewClub] = useState('');
  const [newAthletic, setNewAthletic] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileTypeToggle = (type: ProfileType) => {
    setProfileData(prev => {
      if (prev.profileType.includes(type)) {
        return {
          ...prev,
          profileType: prev.profileType.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          profileType: [...prev.profileType, type]
        };
      }
    });
  };
  
  const handleAddInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };
  
  const handleAddClub = () => {
    if (newClub.trim() && !profileData.clubs.includes(newClub.trim())) {
      setProfileData(prev => ({
        ...prev,
        clubs: [...prev.clubs, newClub.trim()]
      }));
      setNewClub('');
    }
  };
  
  const handleAddAthletic = () => {
    if (newAthletic.trim() && !profileData.athletics.includes(newAthletic.trim())) {
      setProfileData(prev => ({
        ...prev,
        athletics: [...prev.athletics, newAthletic.trim()]
      }));
      setNewAthletic('');
    }
  };
  
  const removeItem = (arrayName: ArrayPropertyName, item: string) => {
    setProfileData(prev => {
      if (arrayName === 'interests') {
        return {
          ...prev,
          interests: prev.interests.filter(i => i !== item)
        };
      } else if (arrayName === 'clubs') {
        return {
          ...prev,
          clubs: prev.clubs.filter(i => i !== item)
        };
      } else if (arrayName === 'athletics') {
        return {
          ...prev,
          athletics: prev.athletics.filter(i => i !== item)
        };
      } else if (arrayName === 'profileType') {
        return {
          ...prev,
          profileType: prev.profileType.filter(i => i !== item)
        };
      }
      return prev;
    });
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    if (onSubmit) {
      onSubmit(profileData);
    }
    // Navigate to the matching page after profile creation
    router.push('/matching');
  };
  
  const renderBasicInfoStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Basic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleInputChange}
            min="17"
            max="99"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Pronouns</label>
          <input
            type="text"
            name="pronouns"
            value={profileData.pronouns}
            onChange={handleInputChange}
            placeholder="e.g. he/him, she/her, they/them"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Major</label>
          <input
            type="text"
            name="major"
            value={profileData.major}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Class Year</label>
          <select
            name="classYear"
            value={profileData.classYear}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            required
          >
            <option value="">Select Year</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="graduate">Graduate Student</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNextStep}
          className="paw-button bg-[var(--primary)] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg flex items-center"
        >
          Next <span className="ml-2">🐾</span>
        </button>
      </div>
    </div>
  );
  
  const renderProfileTypeStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">What are you looking for?</h2>
      <p className="text-center text-gray-600 mb-6">You can select multiple options</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleProfileTypeToggle('relationship')}
          className={`p-4 rounded-lg border-2 text-center ${
            profileData.profileType.includes('relationship')
              ? 'border-[var(--primary)] bg-[var(--primary-light)]'
              : 'border-gray-300'
          }`}
        >
          <span className="text-2xl block mb-2">❤️</span>
          <span className="font-medium">Relationship</span>
        </button>
        
        <button
          type="button"
          onClick={() => handleProfileTypeToggle('friendship')}
          className={`p-4 rounded-lg border-2 text-center ${
            profileData.profileType.includes('friendship')
              ? 'border-[var(--primary)] bg-[var(--primary-light)]'
              : 'border-gray-300'
          }`}
        >
          <span className="text-2xl block mb-2">👋</span>
          <span className="font-medium">Friendship</span>
        </button>
        
        <button
          type="button"
          onClick={() => handleProfileTypeToggle('roommate')}
          className={`p-4 rounded-lg border-2 text-center ${
            profileData.profileType.includes('roommate')
              ? 'border-[var(--primary)] bg-[var(--primary-light)]'
              : 'border-gray-300'
          }`}
        >
          <span className="text-2xl block mb-2">🏠</span>
          <span className="font-medium">Roommate</span>
        </button>
        
        <button
          type="button"
          onClick={() => handleProfileTypeToggle('study')}
          className={`p-4 rounded-lg border-2 text-center ${
            profileData.profileType.includes('study')
              ? 'border-[var(--primary)] bg-[var(--primary-light)]' 
              : 'border-gray-300'
          }`}
        >
          <span className="text-2xl block mb-2">📚</span>
          <span className="font-medium">Study Buddy</span>
        </button>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePrevStep}
          className="border border-[var(--primary)] text-[var(--foreground)] px-6 py-2 rounded-full font-medium hover:bg-[var(--primary-light)]"
        >
          Back
        </button>
        
        <button
          type="button"
          onClick={handleNextStep}
          disabled={profileData.profileType.length === 0}
          className={`paw-button bg-[var(--primary)] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg flex items-center ${
            profileData.profileType.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next <span className="ml-2">🐾</span>
        </button>
      </div>
    </div>
  );
  
  const renderInterestsStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Your Interests & Activities</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Interests & Hobbies</label>
        <div className="flex">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest (e.g., hiking, coding, music)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[var(--primary)]"
          />
          <button
            type="button"
            onClick={handleAddInterest}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-r-lg"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {profileData.interests.map((interest, index) => (
            <span 
              key={index}
              className="bg-[var(--primary-light)] px-3 py-1 rounded-full flex items-center text-sm"
            >
              {interest}
              <button
                type="button"
                onClick={() => removeItem('interests', interest)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Clubs & Organizations</label>
        <div className="flex">
          <input
            type="text"
            value={newClub}
            onChange={(e) => setNewClub(e.target.value)}
            placeholder="Add a club or organization"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[var(--primary)]"
          />
          <button
            type="button"
            onClick={handleAddClub}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-r-lg"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {profileData.clubs.map((club, index) => (
            <span 
              key={index}
              className="bg-[var(--primary-light)] px-3 py-1 rounded-full flex items-center text-sm"
            >
              {club}
              <button
                type="button"
                onClick={() => removeItem('clubs', club)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Athletics</label>
        <div className="flex">
          <input
            type="text"
            value={newAthletic}
            onChange={(e) => setNewAthletic(e.target.value)}
            placeholder="Add sports or athletic activities"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[var(--primary)]"
          />
          <button
            type="button"
            onClick={handleAddAthletic}
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-r-lg"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {profileData.athletics.map((athletic, index) => (
            <span 
              key={index}
              className="bg-[var(--primary-light)] px-3 py-1 rounded-full flex items-center text-sm"
            >
              {athletic}
              <button
                type="button"
                onClick={() => removeItem('athletics', athletic)}
                className="ml-2 text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePrevStep}
          className="border border-[var(--primary)] text-[var(--foreground)] px-6 py-2 rounded-full font-medium hover:bg-[var(--primary-light)]"
        >
          Back
        </button>
        
        <button
          type="button"
          onClick={handleNextStep}
          className="paw-button bg-[var(--primary)] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg flex items-center"
        >
          Next <span className="ml-2">🐾</span>
        </button>
      </div>
    </div>
  );
  
  const renderSocialMediaStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Social Media & Preferences</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Social Media (Optional)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={profileData.instagram}
              onChange={handleInputChange}
              placeholder="@username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Snapchat</label>
            <input
              type="text"
              name="snapchat"
              value={profileData.snapchat}
              onChange={handleInputChange}
              placeholder="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Lifestyle Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sleep Schedule</label>
            <select
              name="sleepSchedule"
              value={profileData.sleepSchedule}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="">Select sleep preference</option>
              <option value="early-bird">Early Bird (Early to bed, early to rise)</option>
              <option value="night-owl">Night Owl (Late to bed, late to rise)</option>
              <option value="mixed">Mixed (Varies day to day)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Social Preferences</label>
            <select
              name="socialPreferences"
              value={profileData.socialPreferences}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="">Select social preference</option>
              <option value="extrovert">Extrovert (Love being around people)</option>
              <option value="introvert">Introvert (Prefer quiet and alone time)</option>
              <option value="ambivert">Ambivert (Balance of both)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Study Habits</label>
            <select
              name="studyHabits"
              value={profileData.studyHabits}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="">Select study habit</option>
              <option value="group">Group Study (Prefer studying with others)</option>
              <option value="solo">Solo Study (Prefer studying alone)</option>
              <option value="mixed">Mixed (Depends on the subject)</option>
            </select>
          </div>
        </div>
      </div>
      
      {profileData.profileType.includes('relationship') && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Relationship Preferences</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Orientation</label>
              <select
                name="orientation"
                value={profileData.orientation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">Select orientation</option>
                <option value="straight">Straight</option>
                <option value="gay">Gay</option>
                <option value="lesbian">Lesbian</option>
                <option value="bisexual">Bisexual</option>
                <option value="pansexual">Pansexual</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePrevStep}
          className="border border-[var(--primary)] text-[var(--foreground)] px-6 py-2 rounded-full font-medium hover:bg-[var(--primary-light)]"
        >
          Back
        </button>
        
        <button
          type="submit"
          className="bone-button bg-[var(--primary)] text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg flex items-center"
        >
          Complete Profile <span className="ml-2">🦴</span>
        </button>
      </div>
    </div>
  );
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {step === 1 && renderBasicInfoStep()}
      {step === 2 && renderProfileTypeStep()}
      {step === 3 && renderInterestsStep()}
      {step === 4 && renderSocialMediaStep()}
      
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                step === i ? 'bg-[var(--primary)]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </form>
  );
} 