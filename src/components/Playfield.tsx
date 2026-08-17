import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
	COLS,
	ROWS,
	cellIndex,
	cellsOf,
	chooseMove,
	createGame,
	hardDrop,
	move,
	place,
	reset,
	rotate,
	tick,
	warmUp,
} from '../lib/tetris';
import { useCopy } from '../content/locale';

const CELL = 26;
const PAD = 10;
const WIDTH = COLS * CELL + PAD * 2;
const HEIGHT = ROWS * CELL + PAD * 2;

const EMPTY_RADIUS = 1.3;
const FILLED_RADIUS = 8.4;

/*
 * Gravity interval. The autoplayer runs fast because it commits to a placement
 * immediately and only gravity is left to watch; a human needs room to think.
 */
const AUTO_MS = 135;
const PLAY_MS = 620;
/** Pieces played before first paint, so nobody lands on an empty grid. */
const WARM_UP_PIECES = 24;
/** Hand the board back to the autoplayer after this long without input. */
const IDLE_MS = 14000;

type Mode = 'auto' | 'play';

const Playfield = () => {
	const t = useCopy();
	const gameRef = useRef<ReturnType<typeof createGame> | null>(null);
	if (!gameRef.current) {
		const game = createGame();
		warmUp(game, WARM_UP_PIECES);
		gameRef.current = game;
	}
	/** Spawn counter of the piece the autoplayer has already placed. */
	const plannedRef = useRef(-1);
	const [, redraw] = useReducer((n: number) => n + 1, 0);
	const [mode, setMode] = useState<Mode>('auto');
	const [visible, setVisible] = useState(true);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const lastInputRef = useRef(0);

	/* Pause entirely when scrolled away — no point animating off-screen. */
	useEffect(() => {
		const node = wrapperRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => setVisible(entry.isIntersecting),
			{ rootMargin: '96px' },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	/* The clock. One interval, cleared whenever the mode or visibility changes. */
	useEffect(() => {
		if (!visible) return;

		const interval = window.setInterval(
			() => {
				const game = gameRef.current!;

				if (game.over) {
					reset(game);
					plannedRef.current = -1;
					redraw();
					return;
				}

				if (mode === 'auto') {
					// Decide once per piece, then just let it fall.
					if (game.spawns !== plannedRef.current) {
						const target = chooseMove(game);
						if (target) place(game, target);
						plannedRef.current = game.spawns;
					} else {
						tick(game);
					}
				} else {
					tick(game);
					if (Date.now() - lastInputRef.current > IDLE_MS) {
						setMode('auto');
						plannedRef.current = -1;
					}
				}

				redraw();
			},
			mode === 'auto' ? AUTO_MS : PLAY_MS,
		);

		return () => window.clearInterval(interval);
	}, [mode, visible]);

	const takeOver = useCallback(() => {
		lastInputRef.current = Date.now();
		setMode((current) => {
			if (current === 'play') return current;
			plannedRef.current = -1;
			return 'play';
		});
	}, []);

	/* Keyboard control. Only claims the arrow keys once the board is in play, so
	 * it never steals scrolling from someone reading the page. */
	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			const game = gameRef.current!;
			const isControl =
				event.key === 'ArrowLeft' ||
				event.key === 'ArrowRight' ||
				event.key === 'ArrowUp' ||
				event.key === 'ArrowDown' ||
				event.key === ' ';

			if (mode !== 'play') {
				if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') takeOver();
				return;
			}

			if (event.key === 'Escape') {
				setMode('auto');
				plannedRef.current = -1;
				return;
			}
			if (!isControl) return;

			event.preventDefault();
			lastInputRef.current = Date.now();

			if (event.key === 'ArrowLeft') move(game, -1);
			else if (event.key === 'ArrowRight') move(game, 1);
			else if (event.key === 'ArrowUp') rotate(game);
			else if (event.key === 'ArrowDown') tick(game);
			else hardDrop(game);

			redraw();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [mode, takeOver]);

	/* --- Render ------------------------------------------------------------- */

	const game = gameRef.current;
	const active = new Set<number>();
	if (game.piece) {
		for (const [x, y] of cellsOf(game.piece)) {
			if (y >= 0) active.add(cellIndex(x, y));
		}
	}

	const empty: number[] = [];
	const settled: number[] = [];
	for (let i = 0; i < COLS * ROWS; i += 1) {
		if (active.has(i)) continue;
		(game.board[i] ? settled : empty).push(i);
	}

	const cx = (i: number) => PAD + (i % COLS) * CELL + CELL / 2;
	const cy = (i: number) => PAD + Math.floor(i / COLS) * CELL + CELL / 2;

	return (
		<div
			ref={wrapperRef}
			className={`playfield playfield--${mode}`}
			onPointerDown={takeOver}
		>
			<svg
				className="playfield__board"
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
				aria-hidden="true"
				focusable="false"
			>
				<g className="playfield__empty">
					{empty.map((i) => (
						<circle key={i} cx={cx(i)} cy={cy(i)} r={EMPTY_RADIUS} />
					))}
				</g>
				<g className="playfield__settled">
					{settled.map((i) => (
						<circle key={i} cx={cx(i)} cy={cy(i)} r={FILLED_RADIUS} />
					))}
				</g>
				<g className="playfield__active">
					{[...active].map((i) => (
						<circle key={i} cx={cx(i)} cy={cy(i)} r={FILLED_RADIUS} />
					))}
				</g>
			</svg>

			<p className="playfield__hud">
				{mode === 'auto' ? (
					<>
						{t.playfield.idle} ·{' '}
						<span className="playfield__cue">{t.playfield.cue}</span>
					</>
				) : (
					<>
						{t.playfield.lines}{' '}
						<span className="playfield__score">{game.lines}</span> ·{' '}
						{t.playfield.controls}
					</>
				)}
			</p>
		</div>
	);
};

export default Playfield;
