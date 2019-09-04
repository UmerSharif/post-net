import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useState } from "react";
import "./Register.css";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

export default function Register(props) {
  let initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  };
  const [Values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const onChange = e => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: Values
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
  };

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
          label="Email"
          type="email"
          placeholder="Email..."
          name="email"
          value={Values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          type="password"
          name="confirmPassword"
          value={Values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;
