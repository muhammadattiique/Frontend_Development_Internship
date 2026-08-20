import { useState, useEffect } from 'react';
import { StorageService, ProfilePreferences } from '../services/storageService';

export function usePreferences() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfilePreferences>({ username: '', notificationsEnabled: true });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadAll() {
      try {
        const savedTheme = await StorageService.getTheme();
        const savedOnboarding = await StorageService.getOnboardingCompleted();
        const savedFavorites = await StorageService.getFavorites();
        const savedProfile = await StorageService.getProfilePreferences();

        if (savedTheme) setTheme(savedTheme);
        setHasCompletedOnboarding(savedOnboarding);
        setFavorites(savedFavorites);
        if (savedProfile) setProfile(savedProfile);
      } catch (e) {
        console.error('Failed to load local preferences', e);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    await StorageService.saveTheme(nextTheme);
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    await StorageService.setOnboardingCompleted(true);
  };

  const handleToggleFavorite = async (itemId: string) => {
    const updated = await StorageService.toggleFavorite(itemId);
    setFavorites(updated);
  };

  const updateProfile = async (newPrefs: ProfilePreferences) => {
    setProfile(newPrefs);
    await StorageService.saveProfilePreferences(newPrefs);
  };

  return {
    theme,
    toggleTheme,
    hasCompletedOnboarding,
    completeOnboarding,
    favorites,
    toggleFavorite: handleToggleFavorite,
    profile,
    updateProfile,
    loading,
  };
}