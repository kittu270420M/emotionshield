import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'emoticalm-theme' }
  )
);

export const themeColors = {
  light: {
    bg: 'bg-white',
    bgSecondary: 'bg-gray-50',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-400',
    border: 'border-gray-200',
    card: 'bg-white',
    accent: 'bg-violet-500',
    accentText: 'text-violet-500',
    gradient: 'from-violet-50 via-rose-50 to-amber-50',
  },
  dark: {
    bg: 'bg-[#0a0a0f]',
    bgSecondary: 'bg-[#12121a]',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-500',
    border: 'border-gray-800',
    card: 'bg-[#16161f]',
    accent: 'bg-violet-600',
    accentText: 'text-violet-400',
    gradient: 'from-violet-950/30 via-indigo-950/30 to-purple-950/30',
  },
};
