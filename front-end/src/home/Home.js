import "./Home.css"
import { useState, useEffect } from "react";
import bootstrap, { ThemeProvider, Container, Row, Col, Stack } from "react-bootstrap";
import Typist from "react-typist";
import MainAPI from "../api/Api";
import Navigation from "../navigation/Navigation";


function Home({newsletter}) {
  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs">
    <Navigation/>
    <div className="Home mx-auto">
      <Stack gap={5}>
      {newsletter ? newsletter.entries.map((entry) => {
        return <div className={`article-${entry.id}`}>
            <a href={entry.url}><h2>{entry.title}</h2></a>
            <p>{entry.article}</p>
        </div>;
      }) : <h1>test</h1>}
      </Stack>
    </div>
    </ThemeProvider>
  );
}

export default Home;
