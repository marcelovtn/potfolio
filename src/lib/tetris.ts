/**
 * Tetris, small enough to be a graphic.
 *
 * The hero grafismo is this board: the same dot lattice as the other fields,
 * except the dots are cells. Empty cells stay hairline, settled cells fill in
 * ink, and the falling piece is the one place the accent colour appears.
 *
 * Pure logic, no rendering and no DOM — so the interesting part stays testable
 * and the component below it stays dumb.
 */

export const COLS = 12;
export const ROWS = 20;

/** Cell coordinates within a piece's own 4×4 box. */
type Cells = readonly (readonly [number, number])[];

const BASE: Cells[] = [
	[
		[0, 1],
		[1, 1],
		[2, 1],
		[3, 1],
	], // I
	[
		[1, 0],
		[2, 0],
		[1, 1],
		[2, 1],
	], // O
	[
		[1, 0],
		[0, 1],
		[1, 1],
		[2, 1],
	], // T
	[
		[1, 0],
		[2, 0],
		[0, 1],
		[1, 1],
	], // S
	[
		[0, 0],
		[1, 0],
		[1, 1],
		[2, 1],
	], // Z
	[
		[0, 0],
		[0, 1],
		[1, 1],
		[2, 1],
	], // J
	[
		[2, 0],
		[0, 1],
		[1, 1],
		[2, 1],
	], // L
];

function normalise(cells: Cells): Cells {
	const minX = Math.min(...cells.map(([x]) => x));
	const minY = Math.min(...cells.map(([, y]) => y));
	return cells.map(([x, y]) => [x - minX, y - minY] as const);
}

function rotateCW(cells: Cells): Cells {
	// Rotate inside a fixed 4-wide box, then pull back to the origin.
	return normalise(cells.map(([x, y]) => [3 - y, x] as const));
}

function key(cells: Cells): string {
	return [...cells]
		.map(([x, y]) => `${x},${y}`)
		.sort()
		.join(' ');
}

/** Every distinct rotation of every piece, precomputed once. */
export const PIECES: Cells[][] = BASE.map((base) => {
	const states: Cells[] = [];
	const seen = new Set<string>();
	let current = normalise(base);
	for (let i = 0; i < 4; i += 1) {
		const k = key(current);
		if (!seen.has(k)) {
			seen.add(k);
			states.push(current);
		}
		current = rotateCW(current);
	}
	return states;
});

export interface Piece {
	kind: number;
	rot: number;
	x: number;
	y: number;
}

export interface Game {
	/** Settled cells, row-major, 1 or 0. */
	board: Uint8Array;
	piece: Piece | null;
	queue: number[];
	lines: number;
	over: boolean;
	/** Incremented on every spawn, so callers can tell a new piece from a moved
	 * one without holding on to object identity. */
	spawns: number;
}

const at = (col: number, row: number) => row * COLS + col;

function shuffledBag(): number[] {
	const bag = [0, 1, 2, 3, 4, 5, 6];
	for (let i = bag.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[bag[i], bag[j]] = [bag[j], bag[i]];
	}
	return bag;
}

export function cellsOf(piece: Piece): Array<[number, number]> {
	return PIECES[piece.kind][piece.rot].map(
		([x, y]) => [piece.x + x, piece.y + y] as [number, number],
	);
}

export function collides(board: Uint8Array, piece: Piece): boolean {
	for (const [x, y] of cellsOf(piece)) {
		if (x < 0 || x >= COLS || y >= ROWS) return true;
		if (y >= 0 && board[at(x, y)]) return true;
	}
	return false;
}

function spawn(game: Game): void {
	if (game.queue.length < 7) game.queue.push(...shuffledBag());
	const kind = game.queue.shift()!;
	const cells = PIECES[kind][0];
	const width = Math.max(...cells.map(([x]) => x)) + 1;
	const piece: Piece = {
		kind,
		rot: 0,
		x: Math.floor((COLS - width) / 2),
		y: -1,
	};
	if (collides(game.board, piece)) {
		game.over = true;
		game.piece = null;
		return;
	}
	game.piece = piece;
	game.spawns += 1;
}

export function createGame(): Game {
	const game: Game = {
		board: new Uint8Array(COLS * ROWS),
		piece: null,
		queue: shuffledBag(),
		lines: 0,
		over: false,
		spawns: 0,
	};
	spawn(game);
	return game;
}

function clearLines(game: Game): number {
	let cleared = 0;
	for (let row = ROWS - 1; row >= 0; row -= 1) {
		let full = true;
		for (let col = 0; col < COLS; col += 1) {
			if (!game.board[at(col, row)]) {
				full = false;
				break;
			}
		}
		if (!full) continue;
		cleared += 1;
		game.board.copyWithin(COLS, 0, at(0, row));
		game.board.fill(0, 0, COLS);
	}
	game.lines += cleared;
	return cleared;
}

function lock(game: Game): void {
	if (!game.piece) return;
	for (const [x, y] of cellsOf(game.piece)) {
		if (y >= 0) game.board[at(x, y)] = 1;
	}
	clearLines(game);
	spawn(game);
}

/** One gravity step: fall if possible, otherwise settle and spawn the next. */
export function tick(game: Game): void {
	if (game.over || !game.piece) return;
	const next = { ...game.piece, y: game.piece.y + 1 };
	if (collides(game.board, next)) lock(game);
	else game.piece = next;
}

export function move(game: Game, dx: number): boolean {
	if (!game.piece) return false;
	const next = { ...game.piece, x: game.piece.x + dx };
	if (collides(game.board, next)) return false;
	game.piece = next;
	return true;
}

export function rotate(game: Game): boolean {
	if (!game.piece) return false;
	const states = PIECES[game.piece.kind];
	const rot = (game.piece.rot + 1) % states.length;
	// Try in place, then nudge one column either way — a poor man's wall kick.
	for (const dx of [0, -1, 1, -2, 2]) {
		const next = { ...game.piece, rot, x: game.piece.x + dx };
		if (!collides(game.board, next)) {
			game.piece = next;
			return true;
		}
	}
	return false;
}

export function hardDrop(game: Game): void {
	if (!game.piece) return;
	while (game.piece) {
		// Annotated: assigning back into game.piece makes the inference circular.
		const next: Piece = { ...game.piece, y: game.piece.y + 1 };
		if (collides(game.board, next)) break;
		game.piece = next;
	}
	lock(game);
}

export function reset(game: Game): void {
	game.board.fill(0);
	game.queue = shuffledBag();
	game.lines = 0;
	game.over = false;
	spawn(game);
}

/* --- Autoplay -------------------------------------------------------------- *
 * The board plays itself while nobody is holding the keys, so in its resting
 * state it reads as a graphic that happens to be moving rather than as an
 * abandoned game. Standard four-term heuristic, evaluated over every rotation
 * and column — a few hundred cheap simulations per piece.
 */

function evaluate(board: Uint8Array, cleared: number): number {
	const heights = new Array<number>(COLS).fill(0);
	let holes = 0;

	for (let col = 0; col < COLS; col += 1) {
		let seenBlock = false;
		for (let row = 0; row < ROWS; row += 1) {
			const filled = board[at(col, row)] === 1;
			if (filled && !seenBlock) {
				seenBlock = true;
				heights[col] = ROWS - row;
			} else if (!filled && seenBlock) {
				holes += 1;
			}
		}
	}

	let aggregate = 0;
	let bumpiness = 0;
	for (let col = 0; col < COLS; col += 1) {
		aggregate += heights[col];
		if (col > 0) bumpiness += Math.abs(heights[col] - heights[col - 1]);
	}

	return -0.51 * aggregate + 0.76 * cleared - 0.36 * holes - 0.18 * bumpiness;
}

export interface AiMove {
	rot: number;
	x: number;
}

export function chooseMove(game: Game): AiMove | null {
	if (!game.piece || game.over) return null;

	const states = PIECES[game.piece.kind];
	let best: AiMove | null = null;
	let bestScore = -Infinity;

	for (let rot = 0; rot < states.length; rot += 1) {
		const width = Math.max(...states[rot].map(([x]) => x)) + 1;
		for (let x = 0; x <= COLS - width; x += 1) {
			const probe: Piece = { kind: game.piece.kind, rot, x, y: -1 };
			if (collides(game.board, probe)) continue;

			while (!collides(game.board, { ...probe, y: probe.y + 1 })) probe.y += 1;

			const trial = Uint8Array.from(game.board);
			for (const [cx, cy] of cellsOf(probe)) {
				if (cy >= 0) trial[at(cx, cy)] = 1;
			}

			let cleared = 0;
			for (let row = 0; row < ROWS; row += 1) {
				let full = true;
				for (let col = 0; col < COLS; col += 1) {
					if (!trial[at(col, row)]) {
						full = false;
						break;
					}
				}
				if (full) cleared += 1;
			}

			const score = evaluate(trial, cleared);
			if (score > bestScore) {
				bestScore = score;
				best = { rot, x };
			}
		}
	}

	return best;
}

/**
 * Snap the live piece straight to the chosen rotation and column.
 *
 * Walking there one cell per tick took about thirty ticks per piece, which read
 * as a stalled graphic rather than a game. The autoplayer commits immediately
 * and then falls under normal gravity, which is what actually looks alive.
 */
export function place(game: Game, target: AiMove): void {
	if (!game.piece) return;
	const candidate: Piece = { ...game.piece, rot: target.rot, x: target.x };
	if (!collides(game.board, candidate)) game.piece = candidate;
}

/**
 * Play a number of pieces instantly. Used once before first paint so a visitor
 * arrives at a board mid-game instead of an empty grid.
 */
export function warmUp(game: Game, pieces: number): void {
	for (let i = 0; i < pieces && !game.over; i += 1) {
		const target = chooseMove(game);
		if (target) place(game, target);
		hardDrop(game);
	}
}

export const cellIndex = at;
