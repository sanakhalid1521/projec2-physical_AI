import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '../components/AuthContext';

function ProfilePage() {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    programmingLevel: 'beginner',
    roboticsFamiliarity: 'none',
    preferredLanguage: 'en',
    contentDepth: 'basic'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name || '',
        email: user.email || '',
        programmingLevel: user.programmingLevel || 'beginner',
        roboticsFamiliarity: user.roboticsFamiliarity || 'none',
        preferredLanguage: user.preferredLanguage || 'en',
        contentDepth: user.contentDepth || 'basic'
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // In a real implementation, you would update the user profile via API
      // For now, we'll just show a success message
      setSaveStatus('Profile updated successfully!');
      setIsEditing(false);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      setSaveStatus('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <Layout title="User Profile" description="Manage your profile and preferences">
        <div className="container margin-vert--lg">
          <div className="text--center">
            <p>Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="User Profile" description="Manage your profile and preferences">
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div className="card">
                <div className="card__body text--center">
                  <p>Please <a href="/login">sign in</a> to view your profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="User Profile" description="Manage your profile and preferences">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="card">
              <div className="card__header">
                <h2>Your Profile</h2>
                {!isEditing && (
                  <button
                    className="button button--secondary button--sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <div className="card__body">
                {saveStatus && (
                  <div className={`alert ${saveStatus.includes('success') ? 'alert--success' : 'alert--danger'}`}>
                    {saveStatus}
                  </div>
                )}

                {isEditing ? (
                  <form onSubmit={handleSave}>
                    <div className="margin-bottom--md text--center">
                      <div className="margin-bottom--sm">
                        <img
                          src="/img/profile-pic.png"
                          alt="Profile"
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #e0e0e0'
                          }}
                        />
                      </div>
                      <p className="text--small color--gray">Profile Picture</p>
                    </div>

                    <div className="margin-bottom--md">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={userProfile.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="margin-bottom--md">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={userProfile.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="row margin-bottom--md">
                      <div className="col col--6">
                        <div>
                          <label htmlFor="programmingLevel">Programming Level</label>
                          <select
                            id="programmingLevel"
                            name="programmingLevel"
                            className="form-control"
                            value={userProfile.programmingLevel}
                            onChange={handleChange}
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                      <div className="col col--6">
                        <div>
                          <label htmlFor="roboticsFamiliarity">Robotics Familiarity</label>
                          <select
                            id="roboticsFamiliarity"
                            name="roboticsFamiliarity"
                            className="form-control"
                            value={userProfile.roboticsFamiliarity}
                            onChange={handleChange}
                          >
                            <option value="none">No Experience</option>
                            <option value="basic">Basic Knowledge</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row margin-bottom--md">
                      <div className="col col--6">
                        <div>
                          <label htmlFor="preferredLanguage">Preferred Language</label>
                          <select
                            id="preferredLanguage"
                            name="preferredLanguage"
                            className="form-control"
                            value={userProfile.preferredLanguage}
                            onChange={handleChange}
                          >
                            <option value="en">English</option>
                            <option value="ur">اردو</option>
                          </select>
                        </div>
                      </div>
                      <div className="col col--6">
                        <div>
                          <label htmlFor="contentDepth">Content Depth</label>
                          <select
                            id="contentDepth"
                            name="contentDepth"
                            className="form-control"
                            value={userProfile.contentDepth}
                            onChange={handleChange}
                          >
                            <option value="basic">Basic</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="button-group button-group--end">
                      <button
                        type="button"
                        className="button button--secondary margin-right--sm"
                        onClick={() => {
                          setIsEditing(false);
                          // Reload original values from user context
                          if (user) {
                            setUserProfile({
                              name: user.name || '',
                              email: user.email || '',
                              programmingLevel: user.programmingLevel || 'beginner',
                              roboticsFamiliarity: user.roboticsFamiliarity || 'none',
                              preferredLanguage: user.preferredLanguage || 'en',
                              contentDepth: user.contentDepth || 'basic'
                            });
                          }
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button button--primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="text--center margin-bottom--lg">
                      <img
                        src="/img/profile-pic.png"
                        alt="Profile"
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #e0e0e0'
                        }}
                      />
                    </div>
                    <div className="margin-bottom--md">
                      <strong>Name:</strong> {userProfile.name || 'Not set'}
                    </div>
                    <div className="margin-bottom--md">
                      <strong>Email:</strong> {userProfile.email}
                    </div>
                    <div className="margin-bottom--md">
                      <strong>Programming Level:</strong> {userProfile.programmingLevel}
                    </div>
                    <div className="margin-bottom--md">
                      <strong>Robotics Familiarity:</strong> {userProfile.roboticsFamiliarity}
                    </div>
                    <div className="margin-bottom--md">
                      <strong>Preferred Language:</strong> {userProfile.preferredLanguage === 'en' ? 'English' : 'اردو'}
                    </div>
                    <div className="margin-bottom--md">
                      <strong>Content Depth:</strong> {userProfile.contentDepth}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;