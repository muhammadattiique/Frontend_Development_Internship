import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  THEME: '@app_theme',
  ONBOARDING_COMPLETED: '@app_onboarding_completed',
  FAVORITES: '@app_favorites',
  PROFILE_PREFERENCES: '@app_profile_preferences',
};

export interface ProfilePreferences {
  username: string;
  notificationsEnabled: boolean;
}

export const StorageService = {
  // 1. Theme
  async saveTheme(theme: 'light' | 'dark'): Promise<void> {
    await AsyncStorage.setItem(KEYS.THEME, theme);
  },
  async getTheme(): Promise<'light' | 'dark' | null> {
    return (await AsyncStorage.getItem(KEYS.THEME)) as 'light' | 'dark' | null;
  },

  // 2. Onboarding Flag
  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, JSON.stringify(completed));
  },
  async getOnboardingCompleted(): Promise<boolean> {
    const val = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
    return val ? JSON.parse(val) : false;
  },

  // 3. Favorites
  async getFavorites(): Promise<string[]> {
    const val = await AsyncStorage.getItem(KEYS.FAVORITES);
    return val ? JSON.parse(val) : [];
  },
  async toggleFavorite(itemId: string): Promise<string[]> {
    const favorites = await this.getFavorites();
    let updated: string[];
    if (favorites.includes(itemId)) {
      updated = favorites.filter((id) => id !== itemId);
    } else {
      updated = [...favorites, itemId];
    }
    await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  },

  // 4. Profile Preferences
  async saveProfilePreferences(prefs: ProfilePreferences): Promise<void> {
    await AsyncStorage.setItem(KEYS.PROFILE_PREFERENCES, JSON.stringify(prefs));
  },
  async getProfilePreferences(): Promise<ProfilePreferences | null> {
    const val = await AsyncStorage.getItem(KEYS.PROFILE_PREFERENCES);
    return val ? JSON.parse(val) : null;
  },
};