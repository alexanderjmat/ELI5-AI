import "./Home.css";
import { ThemeProvider, Col, Stack, Row } from "react-bootstrap";
import { useContext } from "react";
import Context from "../Context";
import Navigation from "../navigation/Navigation";
import Header from "./Header";
import Provider from "../Provider";
import BottomFooter from "./BottomFooter";

function Home() {
  const { home } = useContext(Context)
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
              <p>
                Welcome to the very first edition of ELI5-AI, the newsletter
                that's all about the latest and greatest in the world of
                Artificial Intelligence!
              </p>
              <p className="mb-5">
                This week, we're seeing some major moves in the AI space, with
                companies revolutionizing the way we think about generative AI,
                network security, and even game art creation. But here's the
                really exciting part - this very newsletter is being written by
                AI! That's right, ELI5-AI is using AI technology to curate and
                present exciting AI news to you, making sure you're always in
                the know about the latest advancements. So sit back, relax, and
                let's dive into the latest AI revolution!
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
