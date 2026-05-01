import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const login = async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const toggleFavorite = async (restaurantId) => {
    try {
      const response = await api.post(`/favorites/${restaurantId}`);
      
      // Update local user state with new favorites
      const updatedUser = { ...user, favorites: response.data.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update favorites';
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, toggleFavorite, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
