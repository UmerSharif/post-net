import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormHook } from "../utils/FormHook";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import "./PostForm.css";
import { FETCH_POSTS_QUERY } from "../utils/OutsourceGql";
export default function PostForm() {
  const { onChange, onSubmit, Values } = useFormHook(CreatePostCallback, {
    body: ""
  });

  const [addPost, { error }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      // here we are just adding the new post(result.data.getPost) received from the data base,
      //to the already cached getposts data in the localstorage.
      //(result.data.getPost)  is the first element in the array so that its at the top
      // since its a new post.
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
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
            error={error ? true : false}
            onChange={onChange}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message post-form-error">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
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
