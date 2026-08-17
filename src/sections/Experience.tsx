import type { Role } from '../content/copy';
import { useCopy } from '../content/locale';

/*
 * No grafismo in this section on purpose: the three previews already carry its
 * visual weight, and two graphics at comparable weight read as mush.
 */

const RoleEntry = ({ role, stackLabel }: { role: Role; stackLabel: string }) => (
	<article className="role">
		<div className="role__body">
			<header className="role__head">
				<h3 className="role__company">{role.company}</h3>
				<p className="role__period">{role.period}</p>
			</header>

			<p className="role__title">{role.role}</p>
			<p className="role__context">{role.context}</p>

			<ul className="role__bullets">
				{role.bullets.map((bullet) => (
					<li key={bullet}>{bullet}</li>
				))}
			</ul>

			<dl className="role__stack">
				<dt>{stackLabel}</dt>
				<dd>{role.stack}</dd>
			</dl>
		</div>

		<a
			className="preview"
			href={role.preview.href}
			target="_blank"
			rel="noreferrer"
			aria-label={role.preview.alt}
		>
			{/* Width and height are the real encoded pixels, so the box is reserved
			    before the image arrives and nothing shifts. */}
			<img
				className="preview__shot"
				src={role.preview.src}
				alt={role.preview.alt}
				width={760}
				height={475}
				loading="lazy"
				decoding="async"
			/>
			<span className="preview__domain">{role.preview.domain}</span>
		</a>
	</article>
);

const Experience = () => {
	const t = useCopy();

	return (
		<section className="section" id="experience">
			<div className="shell">
				<div className="section__head">
					<p className="label">{t.experience.label}</p>
				</div>

				{t.experience.roles.map((role) => (
					<RoleEntry key={role.company} role={role} stackLabel={t.experience.stackLabel} />
				))}
			</div>
		</section>
	);
};

export default Experience;
