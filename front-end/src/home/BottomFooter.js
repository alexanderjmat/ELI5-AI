import "./BottomFooter.css";
import React from "react";
import { Row, Col } from "react-bootstrap";

function BottomFooter() {
  return (
    <div className="BottomFooter">
      <div className="BottomFooter__1">
          <p>Website by AJ Matula. All Rights Reserved</p>
      </div>
      <div className="BottomFooter__2">
        <a href="https://github.com/alexanderjmat">Github</a>
        <a href="/disclaimer">Disclaimer</a>
      </div>
    </div>
  );
}

export default BottomFooter;
