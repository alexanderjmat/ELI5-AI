import "./Header.css";
import { ThemeProvider } from "react-bootstrap";
import HeaderContent from "./HeaderContent";
import Provider from "../Provider";

function Header(props) {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="Header">
        <Provider>
          <HeaderContent typist={props.typist} />
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default Header;
