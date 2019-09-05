import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
//custom hooks
import { useFormHook } from "../utils/FormHook";
// import AuthContext from "../context/AuthContext";

export default function Login(props) {
  let initialValues = {
    username: "",
    password: ""
  };

  // const context = useContext(AuthContext);

  // const [Values, setValues] = useState(initialValues);
  const { onChange, onSubmit, Values } = useFormHook(
    forLoginUser,
    initialValues
  );
  const [errors, setErrors] = useState({});
  // const onChange = e => {
  //   setValues({ ...Values, [e.target.name]: e.target.value });
  // };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      // context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: Values
  });

  function forLoginUser() {
    loginUser();
  }

  // const onSubmit = e => {
  //   e.preventDefault();
  //   loginUser();
  // };

  return (
    <div className="register-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h2>Register</h2>
        <Form.Input
          label="Username"
          type="text"
          placeholder="Username..."
          name="username"
          value={Values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          type="password"
          placeholder="Password..."
          name="password"
          value={Values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.values(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(err => {
              return <li key={err}>{err}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      id
      username
      email
      createdAt
      token
    }
  }
`;
