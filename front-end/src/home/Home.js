import "./Home.css";
import {
  ThemeProvider,
  Col,
  Stack,
} from "react-bootstrap";
import Navigation from "../navigation/Navigation";
import Header from "./Header";
import Footer from "./Footer";

function Home({ newsletter }) {
  console.log(newsletter);
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Navigation />
      <Header />
      <div className="Home pt-3">
        <Stack>
          <Col>
            <h1>{newsletter ? newsletter.date_published : "Latest Edition"}</h1>
          </Col>
          <Col>
            <p>
              Welcome to the very first edition of ELI5-AI, the newsletter
              that's all about the latest and greatest in the world of
              Artificial Intelligence!
            </p>
            <p>
              This week, we're seeing some major moves in the AI space, with
              companies revolutionizing the way we think about generative AI,
              network security, and even game art creation. But here's the
              really exciting part - this very newsletter is being written by
              AI! That's right, ELI5-AI is using AI technology to curate and
              present exciting AI news to you, making sure you're always in the
              know about the latest advancements. So sit back, relax, and let's
              dive into the latest AI revolution!
            </p>
          </Col>
        </Stack>
        <Stack gap={4} className="mb-4">
          <h2 className="mx-auto mt-5">Latest developments!</h2>
          {newsletter ? (
            newsletter.entries.map((entry) => {
              return (
                <div className={`article-${entry.id}`}>
                  <a href={entry.url}>
                    <h2>{entry.title}</h2>
                  </a>
                  <p>{entry.article}</p>
                  <hr className="Home__hr w-50 mx-auto"></hr>
                </div>
              );
            })
          ) : (
            <h1>test</h1>
          )}
        </Stack>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default Home;
