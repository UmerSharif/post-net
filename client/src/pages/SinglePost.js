import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

export default function SinglePost(props) {
  const postId = props.match.params.postId;
  console.log(postId);

  const {
    data: { getPost }
  } = useQuery(FETCH_SINGLEPOST, {
    variables: postId
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading.....!</p>; //TODO: Add spinner
  } else {
    const {
      body,
      createdAt,
      username,
      id,
      likeCount,
      commentCount,
      likes,
      comments
    } = getPost;
    postMarkup = (
      <Grid>
        <Grid.Row></Grid.Row> //TODO: continue here....! :)
      </Grid>
    );
  }
  return <div></div>;
}

const FETCH_SINGLEPOST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
