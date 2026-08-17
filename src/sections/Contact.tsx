import cv from '../Assets/cv.pdf';
import Grafismo from '../components/Grafismo';
import { contact } from '../content/copy';
import { useCopy } from '../content/locale';

const Contact = () => {
	const t = useCopy();

	return (
		<section className="section contact" id="contact">
			<Grafismo field="pulse" />
			<div className="shell">
				<p className="label">{t.closing.label}</p>

				<h2 className="display contact__headline">{t.closing.headline}</h2>

				<div className="contact__links">
					<a className="contact__link" href={`mailto:${contact.email}`}>
						{t.closing.email}
					</a>
					<a
						className="contact__link"
						href={contact.linkedin}
						target="_blank"
						rel="noreferrer"
					>
						LinkedIn
					</a>
					<a
						className="contact__link"
						href={contact.github}
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					<a className="contact__link" href={cv} target="_blank" rel="noreferrer">
						{t.closing.resume}
					</a>
				</div>

				<hr className="rule contact__rule" />

				<div className="footer footer--bare">
					<p>
						© {new Date().getFullYear()} {contact.name}
					</p>
					<p className="footer__note">{t.closing.builtWith}</p>
				</div>
			</div>
		</section>
	);
};

export default Contact;
