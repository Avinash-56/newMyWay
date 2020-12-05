import logo from "./logo.svg";
import "./App.css";
import TopNavbar from "./components/layout/TopNavbar";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Alert from './components/layout/Alert'

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <TopNavbar/>
        <Alert/>
        <Switch>
        </Switch>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
