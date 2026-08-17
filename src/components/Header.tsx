import cv from '../Assets/cv.pdf';
import { LOCALES, contact, copy as bundles, type Locale } from '../content/copy';
import { useCopy } from '../content/locale';
import type { Theme } from '../lib/useTheme';

type Props = {
	locale: Locale;
	onLocaleChange: (locale: Locale) => void;
	theme: Theme;
	onThemeToggle: () => void;
};

const SunIcon = () => (
	<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
		<circle cx="8" cy="8" r="3.1" />
		<g strokeWidth="1.3" strokeLinecap="round">
			<path d="M8 1v1.8M8 13.2V15M1 8h1.8M13.2 8H15M3 3l1.3 1.3M11.7 11.7L13 13M13 3l-1.3 1.3M4.3 11.7L3 13" />
		</g>
	</svg>
);

const MoonIcon = () => (
	<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
		<path d="M9.6 1.4a6.6 6.6 0 1 0 5 9.9A5.4 5.4 0 0 1 9.6 1.4z" />
	</svg>
);

const Header = ({ locale, onLocaleChange, theme, onThemeToggle }: Props) => {
	const t = useCopy();
	const nextThemeLabel = theme === 'dark' ? t.theme.toLight : t.theme.toDark;

	return (
		<header className="header">
			<div className="shell header__inner">
				<a href="#top" className="label header__brand">
					{contact.name}
				</a>

				<nav className="header__nav" aria-label={t.nav.experience}>
					<a className="header__link" href="#experience">
						{t.nav.experience}
					</a>
					<a className="header__link" href="#about">
						{t.nav.about}
					</a>
					<a
						className="header__link header__link--cta"
						href={cv}
						target="_blank"
						rel="noreferrer"
					>
						{t.nav.resume}
					</a>

					<div className="switches">
						<div className="locale" role="group" aria-label="Language">
							{LOCALES.map((code) => (
								<button
									key={code}
									type="button"
									className="locale__option"
									aria-pressed={code === locale}
									lang={code === 'pt' ? 'pt-BR' : 'en'}
									title={bundles[code].label}
									onClick={() => onLocaleChange(code)}
								>
									{code.toUpperCase()}
								</button>
							))}
						</div>

						<button
							type="button"
							className="theme"
							onClick={onThemeToggle}
							aria-label={nextThemeLabel}
							title={nextThemeLabel}
						>
							{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
						</button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
