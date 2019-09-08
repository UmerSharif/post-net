import React, { useContext } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/AuthContext";
import DeleteButton from "../components/DeleteButton";

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;
  console.log(postId);

  const {
    data: { getPost }
  } = useQuery(FETCH_SINGLEPOST, {
    variables: { postId }
  });
  console.log("single post for this is getPost:" + getPost);
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
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card Fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr></hr>
              <Card.Content extra>
                <LikeButton
                  user={user}
                  post={{ id, likes, likeCount }}
                ></LikeButton>
                <Button
                  as="div"
                  labelPosition="left"
                  onClick={() => console.log("do comment stuff")}
                >
                  <Button basic color="violet">
                    <Icon name="comments"></Icon>
                  </Button>
                  <Label basic color="violet" pointing="left"></Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
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
