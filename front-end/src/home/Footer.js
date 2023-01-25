import "./Footer.css";
import {
  ThemeProvider,
} from "react-bootstrap";
import FooterContent from "./FooterContent";

function Footer() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div className="Footer mt-4">
        <FooterContent/>
      </div>
    </ThemeProvider>
  );
}

export default Footer;
