import { useEffect } from 'react';

const DRIFT_PX = 12;

/**
 * Drifts the grafismo fields a few pixels with the pointer.
 *
 * Deliberately NOT done by publishing a custom property on `:root`: custom
 * properties inherit, so every pointer frame would invalidate computed style
 * for the ~970 circles inside the fields. Instead the transform is written
 * straight onto the four <svg> elements — four style writes per frame, on a
 * composited property, with the whole thing coalesced into one animation frame.
 *
 * A no-op under prefers-reduced-motion.
 */
export function usePointerDrift(): void {
	useEffect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (reduced.matches) return;

		const fields = Array.from(
			document.querySelectorAll<SVGElement>('.grafismo'),
		);
		if (!fields.length) return;

		let frame = 0;
		let x = 0;
		let y = 0;

		const commit = () => {
			frame = 0;
			const transform = `translate3d(${(x * DRIFT_PX).toFixed(1)}px, ${(
				y * DRIFT_PX
			).toFixed(1)}px, 0)`;
			for (const field of fields) field.style.transform = transform;
		};

		const onMove = (event: PointerEvent) => {
			x = (event.clientX / window.innerWidth) * 2 - 1;
			y = (event.clientY / window.innerHeight) * 2 - 1;
			if (!frame) frame = requestAnimationFrame(commit);
		};

		window.addEventListener('pointermove', onMove, { passive: true });

		return () => {
			window.removeEventListener('pointermove', onMove);
			if (frame) cancelAnimationFrame(frame);
			for (const field of fields) field.style.removeProperty('transform');
		};
	}, []);
}
