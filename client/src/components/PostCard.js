import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PostCard(props) {
  const { user } = useContext(AuthContext);
  const {
    body,
    createdAt,
    username,
    id,
    likeCount,
    commentCount,
    likes,
    comments
  } = props.post; // destructuring data from props

  const toggleLikePost = () => {
    console.log("post liked");
  };
  const PostComment = () => {
    console.log("post comment");
  };
  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow(true)}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as="div" labelPosition="right" onClick={toggleLikePost}>
            <Button color="teal" basic>
              <Icon name="heart" />
            </Button>
            <Label basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="violet" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="violet" pointing="left">
              {commentCount}
            </Label>
          </Button>
          {user && user.username === username && (
            <Button
              as="div"
              color="red"
              basic
              floated="right"
              onClick={() => console.log("deleted")}
            >
              <Icon name="trash alternate" style={{ margin: 0 }} />
            </Button>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
