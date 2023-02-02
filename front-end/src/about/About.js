import eli5ai from "../eli5-ai.svg"
import donate from "../donate.svg"
import "./About.css";
import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Navigation from "../navigation/Navigation";
import Header from "../home/Header";
import BottomFooter from "../home/BottomFooter";

function About() {
  return (
    <div className="About">
      <Navigation />
      <Header />
      <Row className="About__row mx-auto">
        <Col>
          <Card className="About__card">
            <Card.Img className="About__card-img" variant="top" src={eli5ai} />
            <Card.Body>
              <Card.Title><h2>What is ELI5-AI?</h2></Card.Title>
              <Card.Text>
                ELI5-AI is an online tech newsletter with a twist. It uses artificial intelligence to read and summarize current news on AI so that you can find the latest developments neatly wrapped up in one place! Additionally, the newsletter is delivered in a style that is fun and readable for all audiences, technical and non-technical.
              </Card.Text>
              <Button style={{backgroundColor: "blue"}} variant="primary"><a style={{color: "white"}} href="/">Latest edition</a></Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="About__card">
            <Card.Img className="About__card-img" variant="top" src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-9/83167373_2769141126503506_8350662612479901696_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rPvlggEjPRYAX9igWYo&_nc_ht=scontent-lga3-1.xx&oh=00_AfDc3A4IeepoYZajrFdv8KHT9SVYbjMCYITSKY3NPJvrIw&oe=63FF72D2" />
            <Card.Body>
              <Card.Title><h2>AJ Matula 👋</h2></Card.Title>
              <Card.Text>
                Hey everyone! I'm the creator of ELI5-AI. Making the world of tech an easier place to traverse is super important to me. I also enjoy playing the piano in my spare time, and don't get me started on the joys of a good Americano. Currently I'm looking for an awesome software engineering position. Interested in working together?    
              </Card.Text>
              <Button style={{backgroundColor: "red"}} variant="primary"><a style={{color: "white"}} href="https://www.linkedin.com/in/aj-matula/">Hire me</a></Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="About__card">
            <Card.Img className="About__card-img" variant="top" src={donate} />
            <Card.Body>
              <Card.Title><h2>Donate</h2></Card.Title>
              <Card.Text>
                As long as I own ELI5-AI, it will always be ad-free. I'll never try to sell anything to you or use your email for marketing purposes. This project is completely funded from my own pocket and by the generosity of readers who donate. By giving to ELI5-AI, you'll be contributing to the maintainence and continuous growth of the site. 
              </Card.Text>
              <Button style={{backgroundColor: "green"}} variant="primary"><a style={{color: "white"}} href="https://www.paypal.com/paypalme/AlexanderMatula?country.x=US&locale.x=en_US">Donate</a></Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <BottomFooter/>
      
    </div>
  );
}

export default About;
