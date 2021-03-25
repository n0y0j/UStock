import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
import Stock from "./pages/Stock";

const client = new ApolloClient({
  uri: "http://localhost:4000",
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
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
