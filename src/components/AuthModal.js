import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from '@docusaurus/router';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setUserName] = useState('');
  const [programmingLevel, setProgrammingLevel] = useState('beginner');
  const [roboticsFamiliarity, setRoboticsFamiliarity] = useState('none');
  const [error, setError] = useState('');
  const { signIn, loading } = useAuth();
  const history = useHistory();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      // This will redirect to Google OAuth
      window.location.href = '/api/auth/signin/google';
    } catch (err) {
      setError('Google login failed. Please try again.');
      console.error('Google login error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for email/password login
      // In a real implementation, this would call the Better-Auth API
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);

      // Redirect to homepage
      history.push('/');
      onClose();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for registration
      // In a real implementation, this would call the Better-Auth API
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userProfile', JSON.stringify({
        name: name,
        email: email,
        programmingLevel: programmingLevel,
        roboticsFamiliarity: roboticsFamiliarity
      }));

      // Redirect to homepage
      history.push('/');
      onClose();
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              {view === 'login' ? 'Sign In' : 'Create Account'}
            </h4>
            <button type="button" className="btn-close" onClick={onClose}>&times;</button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert--danger">{error}</div>}

            {/* Google Login Button */}
            <div className="margin-bottom--lg">
              <button
                type="button"
                className="button button--secondary button--block"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <i className="fab fa-google"></i> Continue with Google
              </button>
            </div>

            <div className="margin-bottom--lg text--center">
              <span className="color--gray">or</span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={view === 'login' ? handleLogin : handleSignup}>
              {view === 'signup' && (
                <div className="margin-bottom--md">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="margin-bottom--md">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="margin-bottom--md">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {view === 'signup' && (
                <>
                  <div className="row margin-bottom--md">
                    <div className="col col--6">
                      <div>
                        <label htmlFor="programmingLevel" className="form-label">Programming Level</label>
                        <select
                          id="programmingLevel"
                          className="form-control"
                          value={programmingLevel}
                          onChange={(e) => setProgrammingLevel(e.target.value)}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="col col--6">
                      <div>
                        <label htmlFor="roboticsFamiliarity" className="form-label">Robotics Familiarity</label>
                        <select
                          id="roboticsFamiliarity"
                          className="form-control"
                          value={roboticsFamiliarity}
                          onChange={(e) => setRoboticsFamiliarity(e.target.value)}
                        >
                          <option value="none">No Experience</option>
                          <option value="basic">Basic Knowledge</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="button-group button-group--block">
                <button type="submit" className="button button--primary" disabled={loading}>
                  {loading ? 'Processing...' : (view === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </div>
            </form>
          </div>

          <div className="modal-footer text--center">
            <p>
              {view === 'login'
                ? "Don't have an account? "
                : "Already have an account? "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setView(view === 'login' ? 'signup' : 'login');
                  setError('');
                }}
              >
                {view === 'login' ? 'Sign up' : 'Sign in'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;