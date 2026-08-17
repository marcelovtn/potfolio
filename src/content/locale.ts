import { createContext, useContext, useEffect, useState } from 'react';
import { LOCALES, copy, type Copy, type Locale } from './copy';

const STORAGE_KEY = 'locale';

function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Initial language: whatever was chosen last, otherwise the browser's. The page
 * defaults to English because most of the people it is written for read English,
 * but a Brazilian visitor lands in Portuguese without touching anything.
 */
function detect(): Locale {
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (isLocale(stored)) return stored;
	} catch {
		// Private mode, or storage disabled. The browser language still works.
	}
	return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function useLocaleState() {
	// Resolved in an effect rather than at first render, so a future prerender or
	// static export cannot bake one visitor's language into the HTML.
	const [locale, setLocale] = useState<Locale>('en');

	useEffect(() => setLocale(detect()), []);

	useEffect(() => {
		document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
		try {
			window.localStorage.setItem(STORAGE_KEY, locale);
		} catch {
			// Nothing to do — the choice simply will not survive a reload.
		}
	}, [locale]);

	return { locale, setLocale };
}

export const CopyContext = createContext<Copy>(copy.en);

export function useCopy(): Copy {
	return useContext(CopyContext);
}
