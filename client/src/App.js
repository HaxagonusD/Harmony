//views
import HomePage from "./views/HomePage";
import NotFound from "./views/NotFound";
import Profile from "./views/Profile";

import "./App.css";
//react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
