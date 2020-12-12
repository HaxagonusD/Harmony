import axios from "axios";
import "./App.css";
//components
import CurrentTrack from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/SignUp/SignUp";
import VerifyUser from "./components/VerifyUser/VerifyUser";
import NotFound from "./components/NotFound/NotFound";
import ExplorePage from "./components/ExplorePage/ExplorePage";
//react router
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
function App() {
  //TODO add react router. how does reacter router work with ?authorize=true
  return (
    <Router>
      <div className="App">
        <NavLink exact to = "/" activeClassName="active"> Home </NavLink>
        <NavLink to = "/explore" activeClassName="active"> Explore </NavLink>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/verify">
            <VerifyUser />
          </Route>
          <Route path="/profile/:id">
            <CurrentTrack />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route path="/explore">
            <ExplorePage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
