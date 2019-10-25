import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import {
  LoginPage, NotFoundPage, AdminHomePage, QualityHomePage,
  UserPage, EditUsersPage, RouterStage
} from "pages";
import AuthService from "services/AuthService";

class RouterApp extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <AdminRoute exact path="/admin" component={AdminHomePage} />
          <AdminRoute exact path="/usuarios" component={EditUsersPage} />
          <QARoute exact path="/calidad" component={QualityHomePage} />
          <Route exact path="/cuenta" component={UserPage} />
          <Route exact path="/" component={LoginPage} />
          <Route path="/etapas/:name/operacion/:id" children={<RouterStage />} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}


// <SupervisorRoute exact path="/licitaciones" component={AboutPage} />
// <AdminRoute exact path="/productos" component={ProductsPage} />
// <SupervisorRoute exact path="/crear" component={CreatePage} />
// <AdminRoute exact path="/tipos" component={TypesPage} />
// <AdminRoute exact path="/trabajadores" component={WorkersPage} />
// <Route path="*" component={NotFoundPage} />

function QARoute({ component: Component, ...rest }) {
  let auth = new AuthService();
  return (
    <Route
      {...rest}
      render={props =>
        auth.loggedIn() && auth.isQA() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

function AdminRoute({ component: Component, ...rest }) {
  let auth = new AuthService();
  return (
    <Route
      {...rest}
      render={props =>
        auth.loggedIn() && auth.isAdmin() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default RouterApp;
