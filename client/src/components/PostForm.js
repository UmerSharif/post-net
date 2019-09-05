import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormHook } from "../utils/FormHook";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import "./PostForm.css";
export default function PostForm() {
  const { onChange, onSubmit, Values } = useFormHook(CreatePostCallback, {
    body: ""
  });

  const [addPost, { error }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
      Values.body = "";
    },
    variables: Values
  });

  function CreatePostCallback() {
    addPost();
  }

  return (
    <React.Fragment>
      <hr style={{ width: "100%" }} />
      <Form onSubmit={onSubmit} noValidate className="post-form-container">
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input
            type="text"
            placeholder="Hi There...! :)"
            name="body"
            value={Values.body}
            //   error={errors.body ? true : false}
            onChange={onChange}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </React.Fragment>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;
