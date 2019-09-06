import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";
import { FETCH_POSTS_QUERY } from "../utils/OutsourceGql";

export default function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY); //multilevel destructuring , posts is an alias
  return (
    <Grid columns={3}>
      <Grid.Row className="home-title">
        <h2>Recents posts</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Transition.Group duration={300}>
            {posts.map(post => (
              <Grid.Column key={post.id} style={{ marginBottom: "1.2rem" }}>
                <PostCard post={post}></PostCard>
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
      {user && (
        <Grid.Row>
          <PostForm />
        </Grid.Row>
      )}
    </Grid>
  );
}
