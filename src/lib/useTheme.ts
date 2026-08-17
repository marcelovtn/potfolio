import { useEffect, useState } from 'react';

export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

const STORAGE_KEY = 'theme';

function isTheme(value: unknown): value is Theme {
	return value === 'light' || value === 'dark';
}

/**
 * Theme with three real states, not two: an explicit choice, or no choice at all
 * — in which case the operating system decides and nothing is stamped on the
 * root element. `tokens.css` handles the unstamped case with a
 * `prefers-color-scheme` block, so the page is correct before this ever runs.
 */
export function useTheme() {
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (isTheme(stored)) setTheme(stored);
		} catch {
			// Storage disabled. The system preference still applies.
		}
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		if (theme) root.dataset.theme = theme;
		else delete root.dataset.theme;
	}, [theme]);

	/** What the page is actually showing right now, chosen or inherited. */
	const resolved: Theme =
		theme ??
		(typeof window !== 'undefined' &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light');

	const toggle = () => {
		const next: Theme = resolved === 'dark' ? 'light' : 'dark';
		setTheme(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// The choice simply will not survive a reload.
		}
	};

	return { resolved, toggle };
}
