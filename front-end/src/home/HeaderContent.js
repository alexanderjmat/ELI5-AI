import "./HeaderContent.css";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Typist from "react-typist";
import Subscribe from "./Subscribe";
import Provider from "../Provider";

function HeaderContent(props) {
  const headers = {
    withTypist: (
      <Typist cursor={{ show: false }} className="HeaderContent__typist">
        <h1>
          Welcome to ELI5-AI, a bi-weekly newsletter about AI, created by AI.
        </h1>
      </Typist>
    ),
    withoutTypist: (
      <h1 className="HeaderContent__typist">
        Welcome to ELI5-AI, a bi-weekly newsletter about AI, created by AI.
      </h1>
    ),
  };

  return (
    <div className="HeaderContent">
      <Container className="HeaderContent__container">
        <Row>
          <Col className="">
            {props.typist == true ? headers.withTypist : headers.withoutTypist}
          </Col>
        </Row>
        <Provider><Subscribe bg="yellow" text="black" /></Provider>
      </Container>
    </div>
  );
}

export default HeaderContent;
