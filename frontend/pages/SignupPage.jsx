import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../auth.css';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
    <line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
);

const BookOpenIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { signup, socialLogin, exchangeGithubCode } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    if (!password) return { level: 0, text: '', class: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { level: 1, text: 'Weak password', class: 'weak' };
    if (score <= 3) return { level: 2, text: 'Medium password', class: 'medium' };
    return { level: 3, text: 'Strong password', class: 'strong' };
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setLocalError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setLocalError('');
    setIsLoading(true);
    const result = await signup(username, email, password);
    setIsLoading(false);
    if (result.success) {
      navigate('/login');
    } else {
      setLocalError(result.error || 'Signup failed. Please try again.');
    }
  };

  // ===== GOOGLE OAUTH =====
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existing) existing.remove();
    };
  }, []);

  const handleGoogleSignup = () => {
    setLocalError('');
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setLocalError('Google OAuth not configured. Set VITE_GOOGLE_CLIENT_ID in your .env file.');
      return;
    }

    if (!window.google?.accounts?.oauth2) {
      setLocalError('Google Sign-In is still loading. Please try again in a moment.');
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'openid profile email',
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          setLocalError(`Google signup failed: ${tokenResponse.error}`);
          return;
        }
        setIsLoading(true);
        const result = await socialLogin('google', tokenResponse.access_token);
        setIsLoading(false);
        if (result.success) {
          navigate('/');
        } else {
          setLocalError(result.error || 'Google signup failed');
        }
      },
    });
    tokenClient.requestAccessToken();
  };

  // ===== GITHUB OAUTH =====
  const handleGithubSignup = useCallback(() => {
    setLocalError('');
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    if (!clientId) {
      setLocalError('GitHub OAuth not configured. Set VITE_GITHUB_CLIENT_ID in your .env file.');
      return;
    }

    const redirectUri = window.location.origin + '/github-callback.html';
    const scope = 'user:email';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    
    const width = 500, height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    
    const popup = window.open(
      githubAuthUrl,
      'github-auth',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );

    const handleMessage = async (event) => {
      if (event.origin !== window.location.origin) return;
      if (!event.data?.type || event.data.type !== 'github-oauth-code') return;
      
      window.removeEventListener('message', handleMessage);
      const code = event.data.code;
      
      if (!code) {
        setLocalError('GitHub signup was cancelled or failed.');
        return;
      }

      setIsLoading(true);
      const exchangeResult = await exchangeGithubCode(code);
      if (!exchangeResult.success) {
        setIsLoading(false);
        setLocalError(exchangeResult.error || 'Failed to exchange GitHub code');
        return;
      }

      const result = await socialLogin('github', exchangeResult.access_token);
      setIsLoading(false);
      if (result.success) {
        navigate('/');
      } else {
        setLocalError(result.error || 'GitHub signup failed');
      }
    };

    window.addEventListener('message', handleMessage);

    const checkClosed = setInterval(() => {
      if (popup && popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', handleMessage);
      }
    }, 500);
  }, [socialLogin, exchangeGithubCode, navigate]);

  return (
    <div className="auth-page">
      {/* Animated Background */}
      <div className="auth-bg-orbs">
        <div className="orb"></div>
        <div className="orb"></div>
        <div className="orb"></div>
      </div>

      {/* Left Branding Panel */}
      <div className="auth-branding">
        <div className="auth-branding-logo">
          <BookOpenIcon />
          <span>Ebook Emporium</span>
        </div>
        <h1>
          Start your reading<br />
          <span className="gradient-text">adventure today</span>
        </h1>
        <p>
          Create your free account and get instant access to thousands of ebooks. Read, publish, and connect with a global community of book lovers.
        </p>
        <div className="auth-branding-features">
          <div className="auth-branding-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <span>Free access to hundreds of ebooks</span>
          </div>
          <div className="auth-branding-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" x2="12" y1="3" y2="15"/>
              </svg>
            </div>
            <span>Publish & sell your own books</span>
          </div>
          <div className="auth-branding-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span>Join 50,000+ readers worldwide</span>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-inner">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join the community of book lovers today!</p>

            {localError && <div className="error-message">{localError}</div>}

            {/* Social Login Buttons */}
            <div className="social-login">
              <button type="button" className="social-btn google-btn" onClick={handleGoogleSignup}>
                <GoogleIcon />
                Sign up with Google
              </button>
              <button type="button" className="social-btn github-btn" onClick={handleGithubSignup}>
                <GithubIcon />
                Sign up with GitHub
              </button>
            </div>

            <div className="auth-divider">
              <span>or register with email</span>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="auth-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
                <div className="input-icon">
                  <UserIcon />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <div className="input-icon">
                  <MailIcon />
                </div>
              </div>

              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
                <div className="input-icon">
                  <LockIcon />
                </div>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* Password Strength */}
              {password && (
                <div>
                  <div className="password-strength">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`strength-bar ${passwordStrength.level >= i ? `active ${passwordStrength.class}` : ''}`}
                      />
                    ))}
                  </div>
                  <div className={`strength-text ${passwordStrength.class}`}>
                    {passwordStrength.text}
                  </div>
                </div>
              )}

              <label className="remember-me" style={{ marginTop: '-4px' }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Terms</a> & <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Privacy Policy</a></span>
              </label>

              <button type="submit" className="auth-button" disabled={isLoading || !agreeTerms}>
                <span>
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="auth-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>

            <div className="auth-terms">
              By creating an account, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
