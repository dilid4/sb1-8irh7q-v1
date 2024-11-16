import { useState, useEffect } from 'react';
import { User } from '../lib/types/user';
import { userService } from '../lib/services/userService';

interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
          return;
        }

        const user = JSON.parse(userData);
        const isValid = userService.verifyToken(token);

        if (!isValid) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
          return;
        }

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await userService.authenticate(email, password);
      
      if (response && response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        setAuthState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false
        });

        return response;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    window.location.href = '/login';
  };

  return {
    ...authState,
    login,
    logout
  };
}