import { Col, Container, Row } from 'react-bootstrap';
import laptopImg from '../../Assets/about.png';
import Particle from '../Particle';
import AboutCard from './AboutCard';
import Techstack from './Techstack';

function About() {
  return (
    <Container fluid className="about-section" id="about">
      <Particle />
      <Container>
        <Row style={{ justifyContent: 'center', padding: '10px' }}>
          <Col
            md={7}
            style={{
              justifyContent: 'center',
              paddingTop: '30px',
              paddingBottom: '50px',
            }}
          >
            <h1 style={{ fontSize: '2.1em', paddingBottom: '20px' }}>
              Who <strong className="purple">Am I?</strong>
            </h1>
            <AboutCard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: '120px', paddingBottom: '50px' }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading">
          Professional <strong className="purple">Skills </strong>
        </h1>
        <Techstack />
      </Container>
    </Container>
  );
}

export default About;