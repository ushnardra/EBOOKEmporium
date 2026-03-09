import { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from '../config';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setUser({ 
        username: localStorage.getItem('username'),
        name: localStorage.getItem('username'),
      });
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUser({ username: data.username, name: data.username });
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: JSON.stringify(data) };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  /**
   * Social login: verifies provider access token with the backend.
   * @param {string} provider - 'google' or 'github'
   * @param {string} accessToken - OAuth access token from the provider
   */
  const socialLogin = async (provider, accessToken) => {
    try {
      const response = await fetch(`${API_URL}/api/social-login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider, access_token: accessToken }),
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setUser({ username: data.username, name: data.username });
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Social login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error during social login' };
    }
  };

  /**
   * Exchange a GitHub authorization code for an access token via the backend.
   * @param {string} code - GitHub authorization code
   */
  const exchangeGithubCode = async (code) => {
    try {
      const response = await fetch(`${API_URL}/api/github/exchange-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        return { success: true, access_token: data.access_token };
      } else {
        return { success: false, error: data.error || 'Failed to exchange code' };
      }
    } catch (error) {
      return { success: false, error: 'Network error during code exchange' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, socialLogin, exchangeGithubCode, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
