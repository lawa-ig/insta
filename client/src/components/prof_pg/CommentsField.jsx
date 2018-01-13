import React from 'react';
import { Input, Comment, Container, List, Button, Divider, Header, Image, Modal } from 'semantic-ui-react';
import SingleComment from './SingleComment.jsx';

const CommentsField = (props) => {
  return (
    <div>
      <Comment.Group minimal>
        {
          props.post.comments &&
          props.post.comments.map(comment => {
            return <SingleComment comment={comment} />;
          })
        }
      </Comment.Group>

      <Modal.Description image className='footer-content'>    
        <Container className='modal-footer-contain'>
          <Divider />
          <Image className="heart-icon" src={props.isLiked ? './assets/redheart.png' : './assets/like-icon.png'} onClick={props.toggleLike} size='mini' inline/>  
          <Image src="./assets/comment-icon.png" size='mini' inline/>                  
          <Header className='likes-text' size='small'>{props.likeCount} Likes</Header>
          <p className='post-date'> {props.post.date} </p>
          <Divider />
          <Input className='add-comment-input' focus placeholder='Add a Comment...' />
        </Container>
      </Modal.Description>
    </div>
  );
};

export default CommentsField;