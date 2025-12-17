import React from 'react';
import {useAuth} from '@site/src/components/AuthContext';

// Default implementation, that you can customize
function AuthButtonNavbarItem({className}) {
  const { user, loading, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const profileMenu = document.querySelector('.dropdown--profile');
      if (profileMenu && !profileMenu.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className={className}>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className={className}>
      {user ? (
        // User is logged in - show profile menu
        <div className="dropdown dropdown--right dropdown--profile">
          <button
            className="button button--secondary navbar__link"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-haspopup="true"
            aria-expanded={showProfileMenu}
            style={{ display: 'flex', alignItems: 'center' }}
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
            <span>{user.name || user.email.split('@')[0]}</span>
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
        <a
          className="button button--primary"
          href="/login"
        >
          Sign In
        </a>
      )}
    </div>
  );
}

export default AuthButtonNavbarItem;