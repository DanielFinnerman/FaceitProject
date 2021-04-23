import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, { 
    update(proxy) {
      setConfirmOpen(false); //ask for confirm to delete false
      const data = proxy.readQuery({ //delete post from cache
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = data.getPosts.filter((p) => p.id !== postId); //get all posts with not deleted post id
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      if (callback) callback(); //no callback from postcard, do here
    },
    variables: {
      postId
    }
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)} //ask for confirm to delete
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;