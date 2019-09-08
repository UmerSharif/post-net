import React, { useState } from "react";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Confirm
} from "semantic-ui-react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

export default function DeleteButton({ postId }) {
  const [confirm, setConfirm] = useState(false);

  const [DeletePost] = useMutation(DELETE_POST_MUTATION, {
    //once we reach the update function that mean the post
    //has been deleted and then set the model to close
    update() {
      setConfirm(false);
      //TODO: remove the post from the cache (frontend)
    },
    variables: { postId }
  });

  return (
    <React.Fragment>
      <Button
        as="div"
        color="red"
        basic
        floated="right"
        onClick={() => setConfirm(true)}
      >
        <Icon name="trash alternate" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={DeletePost}
      ></Confirm>
    </React.Fragment>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
