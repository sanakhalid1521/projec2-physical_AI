import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import { useAuth } from '../components/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { signIn, signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // Use the auth context method for Google login
      signInWithGoogle();
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call the signIn function from auth context
    const result = await signIn(email, password);

    if (result.success) {
      // Redirect to homepage or previous page
      history.push('/');
    } else {
      setError(result.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Layout title="Login" description="Login to access the Physical AI textbook">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <div className="card">
              <div className="card__header">
                <h2>Login to Your Account</h2>
              </div>
              <div className="card__body">
                {error && <div className="alert alert--danger">{error}</div>}

                {/* Google Login Button */}
                <div className="margin-bottom--lg">
                  <button
                    type="button"
                    className="button button--secondary button--block"
                    onClick={handleGoogleLogin}
                  >
                    <i className="fab fa-google"></i> Continue with Google
                  </button>
                </div>

                <div className="margin-bottom--lg text--center">
                  <span className="color--gray">or</span>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="margin-bottom--md">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="margin-bottom--lg">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="button-group button-group--block">
                    <button type="submit" className="button button--primary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="card__footer">
                <p>
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;