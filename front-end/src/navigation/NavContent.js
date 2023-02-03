import "./NavContent.css";
import { ThemeProvider, Container, Row, Col } from "react-bootstrap";

function NavContent() {
  return (
    <div data-testid="nav-content" className="NavContent d-flex justify-content-between align-items-center">
      <Container>
        <Row>
          <Col>
            <h1 className="NavContent__ELI5-AI mt-2">
              <a href="/">ELI5-AI</a>
            </h1>
          </Col>
          <Col>
            <h1 className="NavContent__FAQ mt-2">
              <a href="/about">ABOUT</a>
            </h1>
          </Col>
          <Col>
            <h1 className="NavContent__DONATE mt-2">
              <a href="https://paypal.me/AlexanderMatula?country.x=US&locale.x=en_US">DONATE</a>
            </h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavContent;
