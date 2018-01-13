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
          {/* <Header className='likes-text' size='small'>{props.likeCount.length} Likes</Header> */}
          <Modal size="mini" trigger={<Header className='likes-text' size='small'>{props.likeCount.length} Likes</Header>}>
            <Modal.Header>Likes</Modal.Header>
            <Modal.Content scrolling><List divided verticalAlign='middle'>{props.likeCount.map((like) => {
              return <List.Item><Image avatar src={like.prof_pic} /><List.Content>{like.name}</List.Content><List.Content className="small-button" floated="right"><Button color="blue" size="mini">Following</Button></List.Content></List.Item>;
            })}</List></Modal.Content>
          </Modal>
          <p className='post-date'> {props.post.date} </p>
          <Divider />
          <Input className='add-comment-input' focus placeholder='Add a Comment...' />
        </Container>
      </Modal.Description>
    </div>
  );
};

export default CommentsField;