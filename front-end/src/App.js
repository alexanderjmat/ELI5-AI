import { useState, useEffect } from "react";
import "./App.css";
import Routes from "./routes/Routes";
import MainAPI from "./api/Api";

function App() {
  const [currentNewsletter, setCurrentNewsletter] = useState();

  useEffect(() => {
    async function getNews() {
      const request = await MainAPI.getLatestNewsletter().then((newsletter) => {
        setCurrentNewsletter(newsletter);
      });
      return request;
    }
    getNews();
  }, []);

  return (
    <div className="App">
      <Routes states={{currentNewsletter}} />
    </div>
  );
}

export default App;
