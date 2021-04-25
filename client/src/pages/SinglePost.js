import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { Button, Card, Form, Grid, Image, Icon, Label } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

const SinglePost = (props) => {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null); // comment out of focus

    const [comment, setComment] = useState(''); //emoty string for default comment
  
    const {
      data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
      variables: {
        postId
      }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
          setComment(''); //empty string
          commentInputRef.current.blur(); //put comment field out of focus
        },
        variables: {
          postId,
          body: comment
        }
      });
  
    function deletePostCallback() {
      props.history.push('/');
    }
  
    let postMarkup;
    if (!getPost) {
      postMarkup = <p>Loading post..</p>;
    } else {
      const {
        id,
        body,
        createdAt,
        username,
        comments,
        likes,
        likeCount,
        commentCount
      } = getPost;
  
      postMarkup = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://cdn-frontend.faceit.com/web/96-1535731472/src/app/assets/images-compress/avatars/avatar_default_user_300x300.jpg"
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
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="red">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="red" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
              {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment here..."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button red"
                        disabled={comment.trim() === ''} //if empty, then button disabled
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
              {comments.map((comment) => (
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    return postMarkup;
  }

  const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
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

export default SinglePost;