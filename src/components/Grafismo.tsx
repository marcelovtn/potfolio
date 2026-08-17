import type { CSSProperties } from 'react';
import { fields, fieldViewBox, type FieldName } from '../lib/dotField';

type Props = {
	field: FieldName;
	/** The hero field is drawn larger — it is the first thing on the page. */
	hero?: boolean;
	/**
	 * Stagger the dots in on first paint. Driven entirely by a CSS custom
	 * property per dot, so there is no animation loop and nothing to schedule —
	 * and `prefers-reduced-motion` skips it in global.css.
	 */
	assemble?: boolean;
};

const Grafismo = ({ field, hero = false, assemble = false }: Props) => (
	<svg
		className={[
			'grafismo',
			hero && 'grafismo--hero',
			assemble && 'grafismo--assemble',
		]
			.filter(Boolean)
			.join(' ')}
		viewBox={fieldViewBox}
		preserveAspectRatio="xMidYMid meet"
		aria-hidden="true"
		focusable="false"
	>
		{fields[field].map((dot, i) => (
			<circle
				key={i}
				cx={dot.x}
				cy={dot.y}
				r={dot.r}
				style={assemble ? ({ '--step': dot.step } as CSSProperties) : undefined}
			/>
		))}
	</svg>
);

export default Grafismo;
