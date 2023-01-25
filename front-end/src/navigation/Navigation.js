import bootstrap, { ThemeProvider, Container, Row, Col, Navbar, Nav, Stack } from "react-bootstrap";

function Navigation() {
  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs">
      <div className="Navigation">
        <Navbar>
            <Stack>
                <Navbar.Brand><h1>ELI5-AI</h1></Navbar.Brand>
            </Stack>
        </Navbar>
        

      </div>
    </ThemeProvider>
  );
}

export default Navigation;
