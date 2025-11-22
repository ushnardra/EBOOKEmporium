import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const users = await response.json();
      if (users.length > 0) {
        setUser(users[0]);
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (err) {
      setError('Failed to connect to the server');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    setError(null);
    try {
      // Check if user already exists
      const checkResponse = await fetch(`http://localhost:3001/users?email=${email}`);
      const existingUsers = await checkResponse.json();
      
      if (existingUsers.length > 0) {
        setError('User already exists with this email');
        return false;
      }

      // Create new user
      const newUser = { name, email, password, id: Date.now().toString() };
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setUser(newUser);
        return true;
      } else {
        setError('Failed to create account');
        return false;
      }
    } catch (err) {
      setError('Failed to connect to the server');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
