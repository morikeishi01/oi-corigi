'use client';
import { useState, useCallback, useEffect } from 'react';

const PIN_KEY = 'oi_corigi_pin';

async function hashPin(pin: string): Promise<string> {
  const data = new TextEncoder().encode(pin + 'oi-corigi-salt-2026');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function usePin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPin, setHasPin] = useState(false);
  const [mode, setMode] = useState<'create' | 'confirm' | 'enter'>('enter');

  useEffect(() => {
    const stored = localStorage.getItem(PIN_KEY);
    setHasPin(!!stored);
    setMode(stored ? 'enter' : 'create');
    setIsLoading(false);
  }, []);

  const login = useCallback(async (pin: string) => {
    const stored = localStorage.getItem(PIN_KEY);
    const hash = await hashPin(pin);
    if (hash === stored) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const createPin = useCallback(async (pin: string) => {
    const hash = await hashPin(pin);
    localStorage.setItem(PIN_KEY, hash);
    setHasPin(true);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const resetPin = useCallback(() => {
    localStorage.clear();
    setHasPin(false);
    setMode('create');
    setIsLoggedIn(false);
  }, []);

  const changePin = useCallback(() => {
    localStorage.removeItem(PIN_KEY);
    setHasPin(false);
    setMode('create');
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, isLoading, hasPin, mode, setMode, login, createPin, logout, resetPin, changePin };
}