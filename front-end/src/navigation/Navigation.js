import "./Navigation.css";
import NavContent from "./NavContent";
import { ThemeProvider } from "react-bootstrap";

function Navigation() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="Navigation">
        <NavContent />
      </div>
    </ThemeProvider>
  );
}

export default Navigation;
