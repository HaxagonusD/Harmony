import "./App.css";
//components
import CurrentTrack from "./components/CurrentTrack";
import Login from "./components/Login";
import { Switch, Route } from "react-router-dom";
function App() {
  //TODO add react router. how does reacter router work with ?authorize=true
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/config">
          <CurrentTrack />
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
