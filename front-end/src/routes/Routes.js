import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/Home";
import Admin from "../Admin";

function Routes(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/admin">
          <Admin/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;