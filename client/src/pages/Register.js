import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useState } from "react";
import "./Register.css";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

export default function Register() {
  let initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  };
  const [Values, setValues] = useState(initialState);
  const onChange = e => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: Values
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="register-container">
      <Form onSubmit={onSubmit} noValidate>
        <h2>Register</h2>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={Values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          value={Values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={Values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={Values.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>
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
