import { Suspense, lazy } from 'react';
import Grafismo from '../components/Grafismo';
import { useCopy } from '../content/locale';
import { useMediaQuery } from '../lib/useMediaQuery';

/*
 * The board is a separate chunk. Anyone on a narrow viewport, or who has asked
 * for reduced motion, gets the static field instead and never downloads it.
 */
const Playfield = lazy(() => import('../components/Playfield'));

const Hero = () => {
	const t = useCopy();
	const roomy = useMediaQuery('(min-width: 901px)');
	const stillness = useMediaQuery('(prefers-reduced-motion: reduce)');
	const playable = roomy && !stillness;

	return (
		<section className="section hero" id="top">
			<div className="shell hero__grid">
				<div>
					<p className="label">{t.profile.eyebrow}</p>

					<h1 className="hero__name">{t.profile.headline}</h1>

					<p className="lead">{t.profile.lead}</p>

					<dl className="hero__now">
						{t.profile.now.map(({ term, value }) => (
							<div key={term}>
								<dt>{term}</dt>
								<dd>{value}</dd>
							</div>
						))}
					</dl>
				</div>

				<div className="hero__aside">
					{playable ? (
						<Suspense fallback={null}>
							<Playfield />
						</Suspense>
					) : (
						<Grafismo field="decay" />
					)}
				</div>
			</div>
		</section>
	);
};

export default Hero;
