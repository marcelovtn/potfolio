import { useEffect, useState } from 'react';

/**
 * Reads a media query in JS rather than hiding things with CSS, so a component
 * that costs something — a game loop, a lazily fetched chunk — is never mounted
 * on a viewport that will not show it.
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const list = window.matchMedia(query);
		setMatches(list.matches);

		const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
		list.addEventListener('change', onChange);
		return () => list.removeEventListener('change', onChange);
	}, [query]);

	return matches;
}
