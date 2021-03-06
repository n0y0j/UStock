import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Premium from "./pages/Premium";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign" exact component={Sign} />
          <Route path="/stock" exact component={Stock} />
          <Route path="/premium" exact component={Premium} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
