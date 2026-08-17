import Grafismo from '../components/Grafismo';
import { useCopy } from '../content/locale';

const About = () => {
	const t = useCopy();

	return (
		<section className="section" id="about">
			<Grafismo field="swell" />
			<div className="shell">
				<div className="section__head">
					<p className="label">{t.about.label}</p>
				</div>

				<p className="lead about__lead">{t.about.lead}</p>

				{t.about.paragraphs.map((paragraph, i) => (
					<p
						key={paragraph.slice(0, 24)}
						className="prose"
						style={{ marginTop: i === 0 ? 0 : 'var(--space-3)' }}
					>
						{paragraph}
					</p>
				))}

				<div className="about__stack">
					<div className="section__head section__head--tight">
						<p className="label">{t.stack.label}</p>
					</div>
					<dl className="stack">
						{t.stack.groups.map((group) => (
							<div className="stack__group" key={group.group}>
								<dt>{group.group}</dt>
								<dd>{group.items}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
};

export default About;
