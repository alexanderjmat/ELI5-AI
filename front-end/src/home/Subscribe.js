import "./Subscribe.css";
import { useState, useContext } from "react";
import Context from "../Context";
import {
  Row,
  Col,
  Button,
  Form,
  Stack,
  Modal
} from "react-bootstrap";

function Subscribe(props) {
  const { sub } =  useContext(Context)
  const buttonStyle = {
    backgroundColor: `${props.bg}`,
    color: `${props.text}`,
  };

  return (
    <div className="Subscribe">
      <Row>
        <div className="Subscribe__form-container">
          <Form>
            <Form.Group className="Subscribe__form">
              <Form.Control
                className="Subscribe__form-input"
                type="email"
                placeholder="Your email address"
                value={sub.email}
                onChange={sub.onChangeEmail}
              ></Form.Control>
              <Form.Text className="Subscribe__form-text">
              We will never share your email. You can opt out at any time.
              </Form.Text>
              <Button
                style={buttonStyle}
                className="Subscribe__form-button"
                variant="secondary"
                onClick={() => {sub.subscribe(); sub.handleShowModal()}}
              >
                <h2>Subscribe</h2>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Row>
      <Modal backdropClassName="modal-backdrop" show={sub.showModal} onHide={() => sub.setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ELI5-AI Subscription Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {sub.subscriptionResponse ? sub.subscriptionResponse : "Loading..."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => sub.setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Subscribe;
