import { Col, Row } from 'react-bootstrap';
import { BiLogoSpringBoot } from 'react-icons/bi';
import { DiGit, DiJavascript1, DiReact } from 'react-icons/di';
import {
	SiJest,
	SiNestjs,
	SiOpenai,
	SiPostgresql,
	SiRedis,
	SiTypescript,
} from 'react-icons/si';

const skills = [
	{ icon: <DiReact />, label: 'React.js' },
	{ icon: <DiJavascript1 />, label: 'JavaScript' },
	{ icon: <SiTypescript />, label: 'TypeScript' },
	{ icon: <SiNestjs />, label: 'NestJS' },
	{ icon: <BiLogoSpringBoot />, label: 'Spring Boot' },
	{ icon: <SiJest />, label: 'Jest' },
	{ icon: <DiGit />, label: 'Git' },
	{ icon: <SiRedis />, label: 'Redis' },
	{ icon: <SiPostgresql />, label: 'PostgreSQL' },
	{ icon: <SiOpenai />, label: 'AI / LLMs' },
];

function Techstack() {
	return (
		<Row style={{ justifyContent: 'center', paddingBottom: '50px' }}>
			{skills.map(({ icon, label }) => (
				<Col key={label} xs={4} md={2} className="tech-icons">
					{icon}
					<p className="tech-icon-label">{label}</p>
				</Col>
			))}
		</Row>
	);
}

export default Techstack;
