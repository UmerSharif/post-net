import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  // console.log({ ...rest });
  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
}

//understanding the above logic
//...rest includes the exact and path information like {exact: true, path: "/register"}
//passed down from parent component.
// the props passed to component at the end is the page prop which is passed in the parent component
// like this component={page}, component={Login} etc
//in passing Argument to AuthRoute({component: Component}), we use alias Component with capital to use in the render prop
// where Component with small letter is not accepted.
