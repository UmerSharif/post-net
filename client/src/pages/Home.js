import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

export default function Home() {
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY); //multilevel destructuring , posts is an alias
  console.log(posts);
  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h2>Recents posts</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: "1.2rem" }}>
              <PostCard post={post}></PostCard>
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;
