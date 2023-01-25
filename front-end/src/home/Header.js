import "./Header.css";
import {
  ThemeProvider,
} from "react-bootstrap";
import HeaderContent from "./HeaderContent";

function Header() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="Header">
        <HeaderContent/>
      </div>
    </ThemeProvider>
  );
}

export default Header;
