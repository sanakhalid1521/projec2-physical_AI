import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PersonalizationContext = createContext();

export function usePersonalization() {
  return useContext(PersonalizationContext);
}

export function PersonalizationProvider({ children }) {
  const { currentUser } = useAuth();
  const [preferences, setPreferences] = useState({
    contentDepth: 'basic',
    preferredLanguage: 'en',
    programmingLevel: 'beginner',
    roboticsFamiliarity: 'none'
  });

  useEffect(() => {
    // Update preferences when user profile changes
    if (currentUser && currentUser.profile) {
      setPreferences({
        contentDepth: currentUser.profile.contentDepth || 'basic',
        preferredLanguage: currentUser.profile.preferredLanguage || 'en',
        programmingLevel: currentUser.profile.programmingLevel || 'beginner',
        roboticsFamiliarity: currentUser.profile.roboticsFamiliarity || 'none'
      });
    } else {
      // Set default preferences for non-logged in users
      setPreferences({
        contentDepth: 'basic',
        preferredLanguage: 'en',
        programmingLevel: 'beginner',
        roboticsFamiliarity: 'none'
      });
    }
  }, [currentUser]);

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));

    // If user is logged in, update their profile as well
    if (currentUser) {
      // In a real app, this would call the API to update user profile
      const updatedProfile = {
        ...currentUser.profile,
        ...newPreferences
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    }
  };

  const personalizeContent = (content, options = {}) => {
    // This function would adapt content based on user preferences
    let adaptedContent = content;

    // Adjust content based on depth preference
    if (preferences.contentDepth === 'basic' && options.adaptForBasic) {
      adaptedContent = options.adaptForBasic(content);
    } else if (preferences.contentDepth === 'advanced' && options.adaptForAdvanced) {
      adaptedContent = options.adaptForAdvanced(content);
    }

    return adaptedContent;
  };

  const value = {
    preferences,
    updatePreferences,
    personalizeContent,
    userLevel: preferences.programmingLevel,
    familiarityLevel: preferences.roboticsFamiliarity
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}