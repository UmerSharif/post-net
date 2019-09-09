import React, { useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useState } from "react";
import "./Register.css";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/AuthContext";
import ImageUpload from '../components/ImageUpload'

//custom hooks
import { useFormHook } from "../utils/FormHook";

export default function Register(props) {
  let initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
  };
  const context = useContext(AuthContext);

  const { onChange, onSubmit, Values } = useFormHook(forAddUser, initialValues);
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      proxy,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: Values
  });

  function forAddUser() {
    addUser();
  }

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
      <ImageUpload />
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
