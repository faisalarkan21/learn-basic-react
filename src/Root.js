import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import App from "./components/login";
import AnotherComponent from "./App";
import register from "./components/register";
import { LayoutDashboard } from "./components/Layout";
import configureStore from "./store/configStore";

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  console.log("rest", rest);
  return (
    // eslint-disable-line
    <Route
      {...rest}
      render={props =>
        false ? (
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
              <Route exact path="/login" component={App} />
              <Route exact path="/register" component={register} />
              <Route exact path="/another" component={AnotherComponent} />
              <PrivateRoute path="/" component={LayoutDashboard} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default Root;
