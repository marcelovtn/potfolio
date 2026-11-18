import { useCopy } from '../content/locale';
import { RoleEntry } from './Experience';

/*
 * Work that is mine rather than an employer's. It reuses the experience entry
 * on purpose: same preview, same stack line, so it reads as the same kind of
 * claim and the "three roles" rule in the copy stays about roles.
 */

const Projects = () => {
	const t = useCopy();

	return (
		<section className="section" id="projects">
			<div className="shell">
				<div className="section__head">
					<p className="label">{t.projects.label}</p>
				</div>

				{t.projects.items.map((project) => (
					<RoleEntry
						key={project.company}
						role={project}
						stackLabel={t.experience.stackLabel}
					/>
				))}
			</div>
		</section>
	);
};

export default Projects;
