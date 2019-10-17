import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import App from "./containers/App/App";
import Post from "./containers/Post/Post";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/post/:id" component={Post} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
