import { Col, Container, Row } from 'react-bootstrap';
import advogapp from '../../Assets/Projects/advogapp.png';
import api from '../../Assets/Projects/api.png';
import amFinance from '../../Assets/Projects/amfinance.png';
import omnichannel from '../../Assets/Projects/omnichannel.png';
import Particle from '../Particle';
import ProjectCard from './ProjectCards';
function Projects() {
  return (
    <Container fluid className="project-section" id="project">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Recent Projects</strong>
        </h1>
        <p style={{ color: 'white' }}>
          Here are some personal projects I've made recently.
        </p>
        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={amFinance}
              isBlog={true}
              title="AM Finance"
              description="An entrepreneurial journey where I owned the full product lifecycle — from software architecture and development to marketing strategy and deployment. AM Finance is a SaaS personal finance platform built with Next.js, already serving paying subscribers."
              prodLink="https://www.amfinance.com.br/"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={advogapp}
              isBlog={false}
              title="Advogapp"
              description="Lawyer finder with complete authentication system. Made with Spring boot and React.js and Terraform for deployment using ec2 and s3."
              ghLinkFront="https://github.com/CR3WDev/advogapp-front"
              ghLinkBack="https://github.com/CR3WDev/advogapp_back"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={omnichannel}
              isBlog={false}
              title="Omnichat"
              description="Chatbot system for service providers with Meta API integration and realtime communication with clients. Made with react.js and flask"
              ghLinkFront="https://github.com/CR3WDev/omnichat-front"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={api}
              isBlog={true}
              title="Kube"
              description="Omnichannel system with Telegram API integration. Made with Nest.js"
              ghLinkBack="https://github.com/CR3WDev/kube-backend"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Projects;