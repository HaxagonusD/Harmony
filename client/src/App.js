import "./App.css";
//components
import CurrentTrack from "./components/CurrentTrack";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ExplorePage from "./components/ExplorePage";
import { Switch, Route } from "react-router-dom";
function App() {
  //TODO add react router. how does reacter router work with ?authorize=true
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/profile/:id">
          <CurrentTrack />
        </Route>
        <Route path="/404"></Route>
        <Route path="/explore">
          <ExplorePage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
