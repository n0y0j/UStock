import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sign from "./pages/Sign";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Sign} />
      </Switch>
    </Router>
  );
}

export default App;
