import React from "react";
import { Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostCard(props) {
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
          <h2>button here</h2>
        </Card.Content>
      </Card>
    </div>
  );
}
