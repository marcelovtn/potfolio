import { Col, Container, Row } from 'react-bootstrap';
import { AiFillGithub, AiFillYoutube } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import Tilt from 'react-parallax-tilt';
import myImg from '../../Assets/avatar.svg';

const Home2 = () => {
	return (
		<Container fluid className="home-about-section" id="about">
			<Container>
				<Row>
				<Col md={8} className="home-about-description">
					<h1 style={{ fontSize: '2.6em' }}>
					Let me <span className="purple"> INTRODUCE </span> myself
					</h1>
					<p className="home-about-body">
					Full-Stack Engineer with <b className="purple">5+ years</b> building
					web products across fast-paced startups and scale-ups.
					<br />
					<br />
					Strong frontend depth in{' '}
					<i>
						<b className="purple">React.js / TypeScript</b>
					</i>
					, solid backend experience in{' '}
					<i>
						<b className="purple">Node.js / NestJS</b>
					</i>
					, and hands-on{' '}
					<b className="purple">AI tooling</b> with agents, MCP, and streaming integrations.
					<br />
					<br />
					Currently working at{' '}
					<b className="purple">Hubs</b> — a Silicon Valley startup — taking
					full ownership of features end-to-end.
					<br />
					<br />
					Founded and shipped{' '}
					<b className="purple">AM Finance</b> — a SaaS product taken from
					zero to production, owning the full lifecycle: ideation, architecture,
					marketing strategy, and deployment.
					</p>
				</Col>
					<Col md={4} className="myAvtar">
						<Tilt>
							<img src={myImg} className="img-fluid" alt="avatar" />
						</Tilt>
					</Col>
				</Row>
				<Row>
					<Col md={12} className="home-about-social">
						<h1>Find me on</h1>
						<ul className="home-about-social-links">
							<li className="social-icons">
								<a
									href="https://github.com/CR3WDev"
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons"
								>
									<AiFillGithub />
								</a>
							</li>
							<li className="social-icons">
								<a
									href=""
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons"
								>
									<AiFillYoutube />
								</a>
							</li>
							<li className="social-icons">
								<a
									href="https://www.linkedin.com/in/marcelovtn/"
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons"
								>
									<FaLinkedinIn />
								</a>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};
export default Home2;
