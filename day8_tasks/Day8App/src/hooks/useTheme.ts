import { StorageService } from '../services/storageService';
import { useAsyncStorage } from './useAsyncStorage';

export function useTheme() {
  const [theme, setThemeStorage, loading] = useAsyncStorage<'light' | 'dark'>('@app_theme', 'light');

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    await setThemeStorage(nextTheme);
    await StorageService.saveTheme(nextTheme); // Sync with your existing service if needed
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    loading,
  };
}