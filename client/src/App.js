//components
import CurrentTrack from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage/HomePage";
import NotFound from "./components/NotFound/NotFound";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import './App.css'
//react router
import { Switch, Route } from "react-router-dom";
function App() {
  //TODO add react router. how does reacter router work with ?authorize=true
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <HomePage />
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
  );
}

export default App;
