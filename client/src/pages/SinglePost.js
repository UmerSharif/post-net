import React, { useContext, useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/AuthContext";
import DeleteButton from "../components/DeleteButton";

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const postId = props.match.params.postId;

  const {
    data: { getPost }
  } = useQuery(FETCH_SINGLEPOST, {
    variables: { postId }
  });

  const [createComment] = useMutation(COMMENT_MUTATION, {
    update(proxy) {
      //empty state after submitting
      setComment("");
    },
    variables: { postId, body: comment }
  });

  function redirectToHome() {
    props.history.push("/");
  }

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
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr></hr>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="left"
                  onClick={() => console.log("do comment stuff")}
                >
                  <Button basic color="violet">
                    <Icon name="comments"></Icon>
                  </Button>
                  <Label basic color="violet" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton
                    postId={id}
                    callBackToDelButton={redirectToHome}
                  />
                )}
              </Card.Content>
            </Card>
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
            <Card fluid style={{ marginTop: "3rem" }}>
              <Card.Content>
                <Card.Header>Post Comment</Card.Header>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Enter comment..."
                      name="comment"
                      value={comment}
                      onChange={event => setComment(event.target.value)}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ""}
                      onClick={createComment}
                    >
                      Comment
                    </button>
                  </div>
                </Form>
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
      likeCount
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

const COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
