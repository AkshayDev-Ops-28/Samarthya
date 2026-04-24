import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('samarthya_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = (email, password, role = 'volunteer') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: 1,
          email,
          role,
          fullName: role === 'admin' ? 'Admin User' : 'Akshay Kumar',
          avatar: null,
        };
        setUser(userData);
        localStorage.setItem('samarthya_user', JSON.stringify(userData));
        resolve(userData);
      }, 800);
    });
  };

  const register = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          email: data.email,
          role: 'volunteer',
          fullName: data.fullName,
          avatar: null,
        };
        setUser(userData);
        localStorage.setItem('samarthya_user', JSON.stringify(userData));
        resolve(userData);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('samarthya_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
