import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  loggedIn,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return Component ? <Component {...props} /> : render(props);
        }
        return (
          <Redirect
            to={{
              pathname: "/landing",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const { userInfo } = state.userLogin;
  return {
    loggedIn: userInfo,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
