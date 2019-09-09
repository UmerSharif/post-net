import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Icon, Label, Button, Popup } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import "./LikeButton.css";

export default function LikeButton({ post: { id, likes, likeCount } }) {
  const { user } = useContext(AuthContext);
  const [liked, setLike] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [user, likes]); //TODO: what is dependency array ? Google time

  const [LikePost] = useMutation(LIKE_POST, {
    variables: { postId: id } //id from the props
  });
  const ToggleLikePost = () => {
    LikePost();
  };
  return (
    <Button as="div" labelPosition="right" onClick={ToggleLikePost}>
      {/* the below logic is for the like user button. it has double ternary operation.
        first it checks if user is logged in, next it checks the boolean "liked"for true or false
        which display the button types based on its value. in the next ternary block we chain the earlier user
        and display the button type when the user is not loggedin.  */}
      <Popup
        content={liked ? "Unlike" : "Like"}
        inverted
        trigger={
          user ? (
            liked ? (
              <Button color="teal">
                <Icon name="heart" />
              </Button>
            ) : (
              <Button color="teal" basic>
                <Icon name="heart" />
              </Button>
            )
          ) : (
            <Button as={Link} to="/login" color="teal" basic>
              <Icon name="heart" />
            </Button>
          )
        }
      />

      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
    //     <Button as="div" labelPosition="right" onClick={toggleLikePost}>
    //   <Button color="teal" basic>
    //     <Icon name="heart" />
    //   </Button>
    //   <Label basic color="teal" pointing="left">
    //     {likeCount}
    //   </Label>
    // </Button>
  );
}

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id

      likes {
        id
        username
      }
      likeCount
    }
  }
`;
