import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Cookies from "cookies-js";

import { Provider } from "react-redux";
import React from "react";
import App from "./components/login";
import AnotherComponent from "./App";
import register from "./components/register";
import LayoutDashboard from "./components/Layout";
import configureStore from "./store/configStore";
import searchPage from "./searchPage";

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  
  const isValid = Cookies.get("isValid") ? JSON.parse(Cookies.get("isValid")).isValid  : false;
  // console.log("rest", isValid);
  return (
    // eslint-disable-line
    <Route
      {...rest}
      render={props =>
        isValid ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location } // eslint-disable-line
            }}
          />
        )
      }
    />
  );
};

// const store = configureStore();

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/search" component={searchPage} />
              <Route exact path="/login" component={App} />
              <Route exact path="/register" component={register} />
              <Route exact path="/another" component={AnotherComponent} />
              <PrivateRoute path="/" component={LayoutDashboard} />
              <PrivateRoute path="/coba" component={LayoutDashboard} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default Root;
