import "./NavContent.css";
import { ThemeProvider, Container, Row, Col } from "react-bootstrap";

function NavContent() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="NavContent">
        <Container fluid>
          <Row>
            <Col md={8}>
              <h1 className="mt-4">
                <a href="/">ELI5-AI</a>
              </h1>
            </Col>
            <Col md={2}>
              <h1 className="mt-4">
                <a href="/">FAQ</a>
              </h1>
            </Col>
            <Col md={2}>
              <h1 className="mt-4">
                <a href="/">DONATE</a>
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default NavContent;
