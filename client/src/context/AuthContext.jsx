import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('careerorbit_user');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse careerorbit_user from localStorage:', e);
    }
    return {
      id: 'demo-user-123',
      name: 'Alex Morgan',
      email: 'alex@careerorbit.dev',
      targetRole: 'Software Engineer / Frontend Specialist',
      experienceLevel: 'Entry Level / Fresher',
      preferredLocation: 'Remote',
      streakDays: 7,
      onboardingCompleted: true,
    };
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('careerorbit_token') || 'demo-token';
    } catch (e) {
      return 'demo-token';
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('careerorbit_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const fetchMe = async () => {
      if (token && token !== 'demo-token') {
        try {
          const data = await api.get('/auth/me');
          if (data && data.user) {
            setUser(data.user);
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.warn('Could not fetch user profile from API:', err);
        }
      }
    };
    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      if (data && data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('careerorbit_token', data.token);
        localStorage.setItem('careerorbit_user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        return data.user;
      }
    } catch (error) {
      console.warn('API login failed, falling back to client auth:', error);
    }

    const demoUser = {
      id: 'demo-user-123',
      name: email ? email.split('@')[0] : 'Alex Morgan',
      email: email || 'alex@careerorbit.dev',
      targetRole: 'Software Engineer / Frontend Specialist',
      experienceLevel: 'Entry Level / Fresher',
      preferredLocation: 'Remote',
      streakDays: 7,
      onboardingCompleted: true,
    };
    setUser(demoUser);
    setToken('demo-token');
    localStorage.setItem('careerorbit_token', 'demo-token');
    localStorage.setItem('careerorbit_user', JSON.stringify(demoUser));
    setIsAuthenticated(true);
    return demoUser;
  };

  const register = async (userData) => {
    try {
      const data = await api.post('/auth/register', userData);
      if (data && data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('careerorbit_token', data.token);
        localStorage.setItem('careerorbit_user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        return data.user;
      }
    } catch (error) {
      console.warn('API register failed, falling back to client auth:', error);
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name || 'Alex Morgan',
      email: userData.email,
      targetRole: userData.targetRole || 'Software Engineer',
      experienceLevel: userData.experienceLevel || 'Entry Level / Fresher',
      preferredLocation: userData.preferredLocation || 'Remote',
      streakDays: 1,
      onboardingCompleted: false,
    };
    setUser(newUser);
    setToken('demo-token');
    localStorage.setItem('careerorbit_token', 'demo-token');
    localStorage.setItem('careerorbit_user', JSON.stringify(newUser));
    setIsAuthenticated(true);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('careerorbit_token');
    localStorage.removeItem('careerorbit_user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const completeOnboarding = (onboardingData) => {
    const updated = {
      ...user,
      ...onboardingData,
      onboardingCompleted: true
    };
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

