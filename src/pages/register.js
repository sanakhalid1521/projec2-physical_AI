import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { useAuth } from '../components/AuthContext';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    programmingLevel: 'beginner',
    roboticsFamiliarity: 'none'
  });
  const [error, setError] = useState('');
  const history = useHistory();
  const { register, signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // Use the auth context method for Google login
      signInWithGoogle();
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Call the register function from auth context
    const result = await register(formData);

    if (result.success) {
      // Redirect to homepage or profile
      history.push('/');
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Layout title="Register" description="Register for the Physical AI textbook">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="card">
              <div className="card__header">
                <h2>Create Your Account</h2>
                <p className="text--center">Tell us about your background to personalize your learning experience</p>
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

                <form onSubmit={handleRegister}>
                  <div className="row">
                    <div className="col col--6">
                      <div className="margin-bottom--md">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col col--6">
                      <div className="margin-bottom--md">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="margin-bottom--md">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
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
                          value={formData.programmingLevel}
                          onChange={handleChange}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                        <p className="text--small color--gray margin-top--xs">
                          How comfortable are you with programming?
                        </p>
                      </div>
                    </div>
                    <div className="col col--6">
                      <div>
                        <label htmlFor="roboticsFamiliarity">Robotics Familiarity</label>
                        <select
                          id="roboticsFamiliarity"
                          name="roboticsFamiliarity"
                          className="form-control"
                          value={formData.roboticsFamiliarity}
                          onChange={handleChange}
                        >
                          <option value="none">No Experience</option>
                          <option value="basic">Basic Knowledge</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                        <p className="text--small color--gray margin-top--xs">
                          How familiar are you with robotics concepts?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="button-group button-group--block">
                    <button type="submit" className="button button--primary">
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
              <div className="card__footer">
                <p>
                  Already have an account? <a href="/login">Login here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;