import logo from "./logo.svg";
import "./App.css";
import Landing from "./components/layout/Landing";
import TopNavbar from "./components/layout/TopNavbar";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <TopNavbar/>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
