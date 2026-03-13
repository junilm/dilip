import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Create a store for theme with localStorage persistence
function createThemeStore() {
    const defaultTheme = 'dark';

    // Get initial theme from localStorage or use default
    const initialTheme = browser
        ? localStorage.getItem('theme') || defaultTheme
        : defaultTheme;

    const { subscribe, set } = writable(initialTheme);

    return {
        subscribe,
        toggle: () => {
            if (browser) {
                const currentTheme = localStorage.getItem('theme') || defaultTheme;
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
                set(newTheme);
            }
        },
        init: () => {
            if (browser) {
                const theme = localStorage.getItem('theme') || defaultTheme;
                document.documentElement.setAttribute('data-theme', theme);
                set(theme);
            }
        }
    };
}

export const theme = createThemeStore();
