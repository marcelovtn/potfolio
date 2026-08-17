import Header from './components/Header';
import { copy } from './content/copy';
import { CopyContext, useLocaleState } from './content/locale';
import { usePointerDrift } from './lib/usePointerDrift';
import { useTheme } from './lib/useTheme';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import './styles/global.css';

const App = () => {
	const { locale, setLocale } = useLocaleState();
	const { resolved: theme, toggle: toggleTheme } = useTheme();
	usePointerDrift();

	return (
		<CopyContext.Provider value={copy[locale]}>
			<Header
				locale={locale}
				onLocaleChange={setLocale}
				theme={theme}
				onThemeToggle={toggleTheme}
			/>
			<main>
				<Hero />
				<Experience />
				<About />
				<Contact />
			</main>
		</CopyContext.Provider>
	);
};

export default App;
