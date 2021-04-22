import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  function likePost() {
    console.log('Like post!!');
  }

  function commentOnPost() {
    console.log('Comment on post!!');
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://cdn-frontend.faceit.com/web/96-1535731472/src/app/assets/images-compress/avatars/avatar_default_user_300x300.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="orange" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="orange" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="red" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="red" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;