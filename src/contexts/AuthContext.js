import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuthStatus = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userEmail = localStorage.getItem('userEmail');
      const userProfile = localStorage.getItem('userProfile');

      if (isLoggedIn && userEmail) {
        const user = {
          email: userEmail,
          profile: userProfile ? JSON.parse(userProfile) : null
        };
        setCurrentUser(user);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        const user = {
          email: email,
          profile: JSON.parse(localStorage.getItem('userProfile') || 'null')
        };
        setCurrentUser(user);
        resolve(user);
      }, 300);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userProfile', JSON.stringify({
          name: userData.name,
          email: userData.email,
          programmingLevel: userData.programmingLevel,
          roboticsFamiliarity: userData.roboticsFamiliarity,
          preferredLanguage: 'en',
          contentDepth: 'basic'
        }));

        const user = {
          email: userData.email,
          profile: {
            name: userData.name,
            email: userData.email,
            programmingLevel: userData.programmingLevel,
            roboticsFamiliarity: userData.roboticsFamiliarity,
            preferredLanguage: 'en',
            contentDepth: 'basic'
          }
        };
        setCurrentUser(user);
        resolve(user);
      }, 300);
    });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setCurrentUser(null);
  };

  const updateProfile = (profileData) => {
    if (currentUser) {
      const updatedProfile = { ...currentUser.profile, ...profileData };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

      const updatedUser = {
        ...currentUser,
        profile: updatedProfile
      };
      setCurrentUser(updatedUser);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}