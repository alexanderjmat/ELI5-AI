import "./HeaderContent.css";
import {
  ThemeProvider,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import Typist from "react-typist";

function HeaderContent() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="HeaderContent">
        <Container fluid>
          <Row>
            <Col>
              <Typist cursor={{ show: false }} className="header">
                <h1>
                  Welcome to ELI5-AI, a weekly newsletter about AI,{" "}
                  <Typist.Delay ms={300} /> <i>created by</i> AI.
                </h1>
              </Typist>
            </Col>
          </Row>
          <Row className="mx-auto my-5">
            <Col lg={2}></Col>
            <Col lg={5} sm={12} xs={12}>
              <Form.Control
                id="form"
                type="text"
                placeholder="Your email address"
              />
              <Form.Text id="disclaimer">
                We will never share your email. You can opt out at any time.
              </Form.Text>
            </Col>
            <Col className="subscribe-button-col" lg={4} sm={12} xs={12}>
              <Button id="btn" variant="secondary">
                <h2>Subscribe</h2>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default HeaderContent;
