import "./Disclaimer.css";
import Navigation from "../navigation/Navigation";
import Header from "../home/Header";
import BottomFooter from "../home/BottomFooter";

function Disclaimer() {
  return (
    <div className="Disclaimer">
      <Navigation />
      <Header />
      <div className="Disclaimer__content">
        <h1>Disclaimer</h1>
        <p>
          The content of ELI5-AI newsletter is generated by artificial
          intelligence and the opinions expressed in the articles do not
          necessarily reflect the views of the owner of ELI5-AI. The owner of
          ELI5-AI does not endorse or take responsibility for any of the
          information contained in the newsletter. If you have any questions or concerns, feel free to <a href="mailto: eli5.ai.news@gmail.com">reach out over email.</a>
        </p>
      </div>

      <BottomFooter />
    </div>
  );
}

export default Disclaimer;
