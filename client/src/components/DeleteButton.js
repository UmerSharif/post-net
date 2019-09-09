import React, { useState } from "react";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Confirm,
  Popup
} from "semantic-ui-react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/OutsourceGql";

export default function DeleteButton({
  postId,
  callBackToDelButton,
  commentId
}) {
  const [confirm, setConfirm] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [DynamicDelete] = useMutation(mutation, {
    //once we reach the update function that mean the post
    //has been deleted and then set the model to close
    update(proxy) {
      if (!commentId) {
        setConfirm(false);
        //TODO: remove the post from the cache (frontend)
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        //remove the post from the cache which has been deleted, using its id
        data.getPosts = data.getPosts.filter(post => post.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      }
      //check for callBackToDelButton, since it only comes form singlepost and not post card.
      if (callBackToDelButton) {
        callBackToDelButton();
      }
    },
    variables: { postId, commentId }
  });

  return (
    <React.Fragment>
      <Popup
        content={commentId ? "Delete Comment" : "Delete Post"}
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            basic
            floated="right"
            onClick={() => setConfirm(true)}
          >
            <Icon name="trash alternate" style={{ margin: 0 }} />
          </Button>
        }
      />

      <Confirm
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={DynamicDelete}
      ></Confirm>
    </React.Fragment>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
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
