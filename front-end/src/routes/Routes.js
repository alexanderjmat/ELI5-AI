import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from "../home/Home";
import Admin from "../home/Admin";
import Provider from "../Provider";
import About from "../about/About";
import Disclaimer from "../content/Disclaimer";
import Confirmation from "../content/Confirmation";

function Routes(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Provider>
            <Home newsletter={props.states.currentNewsletter}/>
          </Provider>
        </Route>
        <Route exact path="/admin">
          <Admin/>
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/disclaimer">
          <Disclaimer/>
        </Route>
        <Route exact path="/confirm-email">
          <Confirmation/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;