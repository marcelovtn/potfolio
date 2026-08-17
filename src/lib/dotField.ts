/**
 * The grafismo, as a function rather than a drawing.
 *
 * Same technique I used for the Verbalt landing page — an ordered lattice of
 * dots whose radius is driven by a density function, so one field can swell,
 * decay or ripple without anyone drawing a single circle by hand. The subjects
 * here are my own: each field is a shape from performance work (a decay curve,
 * a request waterfall, a swell, a pulse) rather than a brand mark.
 *
 * Fields are deterministic. The same seed always yields identical geometry, so
 * the markup is stable across builds and diffs stay readable.
 */

export interface FieldDot {
	x: number;
	y: number;
	r: number;
	/** Normalised 0..1 order, used to stagger the entrance in CSS. */
	step: number;
}

export interface FieldSpec {
	cols: number;
	rows: number;
	width: number;
	height: number;
	padding?: number;
	seed?: number;
	minRadius?: number;
	maxRadius?: number;
	/** How far a dot may drift off the lattice, in user units. */
	scatter?: number;
	/** Radius weight, 0..1, from normalised lattice coordinates. */
	density: (u: number, v: number) => number;
	/** Entrance order, 0..1, from normalised lattice coordinates. */
	order?: (u: number, v: number) => number;
}

/** Linear congruential generator — small, seedable, good enough for jitter. */
function createRandom(seed: number): () => number {
	let state = seed >>> 0;
	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 0x100000000;
	};
}

export function createField(spec: FieldSpec): FieldDot[] {
	const {
		cols,
		rows,
		width,
		height,
		padding = 0,
		seed = 7,
		minRadius = 0,
		maxRadius = 3.2,
		scatter = 0,
		density,
		order = (u) => u,
	} = spec;

	const random = createRandom(seed);
	const usableWidth = width - padding * 2;
	const usableHeight = height - padding * 2;
	const dots: FieldDot[] = [];

	for (let row = 0; row < rows; row += 1) {
		for (let col = 0; col < cols; col += 1) {
			const u = cols === 1 ? 0 : col / (cols - 1);
			const v = rows === 1 ? 0 : row / (rows - 1);

			const weight = Math.min(1, Math.max(0, density(u, v)));
			const r = minRadius + (maxRadius - minRadius) * weight;

			// Skip dots that would be invisible rather than emitting empty nodes.
			if (r < 0.18) continue;

			dots.push({
				x: padding + u * usableWidth + (random() - 0.5) * 2 * scatter,
				y: padding + v * usableHeight + (random() - 0.5) * 2 * scatter,
				r: Math.round(r * 100) / 100,
				step: Math.round(Math.min(1, Math.max(0, order(u, v))) * 100) / 100,
			});
		}
	}

	return dots;
}

const FIELD_WIDTH = 520;
const FIELD_HEIGHT = 420;

/*
 * Lattice sizes are deliberately modest. Every dot is a DOM node, and a page
 * that argues about render cost has no business shipping two thousand of them
 * for decoration. Fewer, slightly larger dots also read better at this opacity.
 */
const base = {
	width: FIELD_WIDTH,
	height: FIELD_HEIGHT,
	padding: 12,
	maxRadius: 5.2,
};

/**
 * One field per section, all at the same visual weight so no single one reads as
 * decoration competing with the copy.
 */
export const fields = {
	/**
	 * Decay — dense and heavy where a page starts loading, resolving to a fine
	 * lattice once the work is done. The hero.
	 */
	decay: createField({
		...base,
		cols: 19,
		rows: 15,
		seed: 11,
		scatter: 0.9,
		density: (u, v) =>
			Math.exp(-2.4 * (1 - u)) * (0.5 + 0.5 * Math.cos((v - 0.5) * Math.PI)),
		// Assemble from the top-left corner outwards.
		order: (u, v) => Math.min(1, Math.hypot(u, v) / 1.414),
	}),

	/**
	 * Swell — an ordered lattice thickening toward its centre. About.
	 */
	swell: createField({
		...base,
		cols: 17,
		rows: 14,
		seed: 31,
		scatter: 0.5,
		density: (u, v) => {
			const d = Math.hypot(u - 0.52, v - 0.46);
			return Math.max(0, 1 - d * 1.9);
		},
	}),

	/**
	 * Pulse — concentric rings, a signal going out. Contact.
	 */
	pulse: createField({
		...base,
		cols: 18,
		rows: 15,
		seed: 43,
		scatter: 0.4,
		density: (u, v) => {
			const d = Math.hypot(u - 0.5, v - 0.5) * 2;
			const ring = Math.abs(Math.sin(d * Math.PI * 2.4));
			return Math.max(0, ring * (1 - d * 0.7));
		},
	}),
} as const;

export type FieldName = keyof typeof fields;

export const fieldViewBox = `0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`;
