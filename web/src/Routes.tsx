import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import { getAccessToken } from "./accessToken";

const PublicRoute: React.FC<RouteProps> = ({
  component: RouteComponent,
  ...rest
}) => {
  if (!RouteComponent) return null;
  const accessToken = getAccessToken();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !accessToken ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/products"} />
        )
      }
    />
  );
};

const PrivateRoute: React.FC<RouteProps> = ({
  component: RouteComponent,
  ...rest
}) => {
  if (!RouteComponent) return null;
  const accessToken = getAccessToken();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        accessToken ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/products" component={Products} />
      </Switch>
    </BrowserRouter>
  );
};
