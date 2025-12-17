import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useHistory } from '@docusaurus/router';

const AuthButton = () => {
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu) {
        const profileMenu = document.querySelector('.dropdown--profile');
        if (profileMenu && !profileMenu.contains(event.target)) {
          setShowProfileMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  if (loading) {
    return (
      <div className="navbar__item">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      {user ? (
        // User is logged in - show profile menu
        <div className="navbar__item dropdown dropdown--right dropdown--profile" ref={el => el}>
          <button
            className="button button--secondary navbar__link"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-haspopup="true"
            aria-expanded={showProfileMenu}
          >
            <img
              src="/img/profile-pic.png"
              alt="Profile"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '8px'
              }}
            />
            {user.name || user.email.split('@')[0]}
          </button>

          {showProfileMenu && (
            <ul className="dropdown__menu">
              <li>
                <a className="dropdown__link" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <button
                  className="dropdown__link dropdown__link--button"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        // User is not logged in - show login button
        <div className="navbar__item">
          <button
            className="button button--primary"
            onClick={() => {
              // Redirect to login page directly since we have login and register pages
              history.push('/login');
            }}
          >
            Sign In
          </button>
        </div>
      )}

      {/* Auth Modal - This is not needed since we redirect to pages */}
    </>
  );
};

export default AuthButton;