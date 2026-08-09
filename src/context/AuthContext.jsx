import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

function normalizeUser(raw) {
  if (!raw || typeof raw !== 'object') return null;
  // Si quedó guardado el envelope { message, user }, recuperar el usuario real.
  if (!raw.role && raw.user && typeof raw.user === 'object') return raw.user;
  return raw.role ? raw : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return normalizeUser(JSON.parse(localStorage.getItem('user') || 'null'));
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(!!localStorage.getItem('token'));

  const persist = useCallback((nextUser, nextToken) => {
    const cleanUser = normalizeUser(nextUser);
    setUser(cleanUser);
    setToken(nextToken);
    if (nextToken) localStorage.setItem('token', nextToken);
    else localStorage.removeItem('token');
    if (cleanUser) localStorage.setItem('user', JSON.stringify(cleanUser));
    else localStorage.removeItem('user');
  }, []);

  const refreshMe = useCallback(async () => {
    if (!localStorage.getItem('token')) {
      setLoading(false);
      return null;
    }
    try {
      const { data } = await api.get('/me');
      persist(data, localStorage.getItem('token'));
      return data;
    } catch {
      persist(null, null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [persist]);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const login = useCallback(async ({ email, password, rol_esperado }) => {
    const { data } = await api.post('/login', { email, password, rol_esperado });
    persist(data.user, data.token);
    return data.user;
  }, [persist]);

  const register = useCallback(async (payload) => {
    const { data } = await api.post('/register', payload);
    persist(data.user, data.token);
    return data.user;
  }, [persist]);

  const logout = useCallback(async () => {
    try {
      if (localStorage.getItem('token')) {
        await api.post('/logout');
      }
    } catch {
      // ignore
    }
    persist(null, null);
  }, [persist]);

  const updateProfile = useCallback(async (payload) => {
    const { data } = await api.put('/me', payload);
    // La API responde { message, user }; hay que persistir solo el usuario.
    const nextUser = data?.user ?? data;
    persist(nextUser, localStorage.getItem('token'));
    return nextUser;
  }, [persist]);

  const changePassword = useCallback(async (payload) => {
    await api.put('/me/password', payload);
  }, []);

  const isAdmin = !!user && ['admin', 'administrador', 'mesero', 'cocina', 'cajero', 'recepcion', 'host'].includes(user.role);
  const isCliente = !!user && user.role === 'cliente';

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
      refreshMe,
      isAdmin,
      isCliente,
      isAuthenticated: !!user && !!token,
    }),
    [user, token, loading, login, register, logout, updateProfile, changePassword, refreshMe, isAdmin, isCliente]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
