import "./Home.css";
import { Col, Stack } from "react-bootstrap";
import { useContext } from "react";
import Context from "../Context";
import Navigation from "../navigation/Navigation";
import Header from "./Header";
import Provider from "../Provider";
import BottomFooter from "./BottomFooter";

function Home() {
  const { home } = useContext(Context)
  console.log(home)
  const hrStyles = [
    {
      border: "2px solid blue",
    },
    {
      border: "2px solid red",
    },
  ];
  const underlineStyles = [
    {
      textDecorationColor: "yellow",
    },
    {
      textDecorationColor: "green",
    },
  ];
  if (!home.currentNewsletter) return;
  return (
    <div>
        <Navigation />
          <Header typist={true} />
        <div className="Home pt-3">
          <Stack>
            <Col>
              <h1>
                {home.currentNewsletter ? home.currentNewsletter.date_published : "Latest Edition"}
              </h1>
            </Col>
            <Col>
              <p className="mb-5">
                {home.currentNewsletter ? home.currentNewsletter.overviews[0].overview : "Loading..."}
              </p>
              <hr className="Home__col-hr yellow my-4" />
            </Col>
          </Stack>
          <Stack gap={4} className="mb-5">
            <h2 className="Home__Stack-h2 mx-auto mt-3">
              Latest developments!
            </h2>
            {home.currentNewsletter ? (
              home.currentNewsletter.entries.map((entry, index) => {
                return (
                  <div className={`article-${entry.id} mt-3`}>
                    {index % 2 == 0 ? (
                      <h2>
                        <a style={underlineStyles[0]} href={entry.url}>
                          {entry.title}
                        </a>
                      </h2>
                    ) : (
                      <h2>
                        <a style={underlineStyles[1]} href={entry.url}>
                          {entry.title}
                        </a>
                      </h2>
                    )}
                    <p className="pb-4">{entry.article}</p>
                    {index % 2 == 0 ? (
                      <hr
                        style={hrStyles[1]}
                        className="Home__Stack-hr w-50 mx-auto"
                      ></hr>
                    ) : (
                      <hr
                        style={hrStyles[0]}
                        className="Home__Stack-hr w-50 mx-auto"
                      ></hr>
                    )}
                  </div>
                );
              })
            ) : (
              <h1>test</h1>
            )}
          </Stack>
        </div>
        <BottomFooter/>
    </div>
  );
}

export default Home;
