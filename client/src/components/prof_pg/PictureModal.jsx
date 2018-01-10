import React from 'react';
import { Input, Rating, Comment, Container, Divider, Button, Header, Image, Modal } from 'semantic-ui-react';

const PicModal = (props) => (
  <Modal size='large' trigger={<Image src={props.img} />}>
    <Modal.Content image className='pic-modal'>
      <Image className='modal-img' src={props.img} />
      <Modal.Description className='modal-description-field'>
        <Container className='modal-header-contain'>
          <Image avatar size='mini' inline src='./assets/fred.png' floated='left' />
          <Header className='uname-modal' size='small' floated='left'>FredZirdung</Header>
        </Container>
        <Divider />

        <Comment.Group minimal>
          {/* Comment can be its own mapped component */}
          <Comment>
            <Comment.Content>
              <div className='comment-div'>
                <Comment.Text className='modal-author' as='a'>Albert</Comment.Text>
                <Comment.Text className='modal-comment'>How artistic!</Comment.Text>
              </div>
            </Comment.Content>
          </Comment>
          {/* End Comment */}
        </Comment.Group>

        <Modal.Description image className='footer-content'>    
          <Container className='modal-footer-contain'>
            <Divider />
            <Image src="./assets/like-icon.png" size='mini' inline/>  
            <Image src="./assets/comment-icon.png" size='mini' inline/>                  
            <Header className='likes-text' size='small'>12 Likes</Header>
            <p className='post-date'> January 9, 2018 </p>
            <Divider />
            <Input className='add-comment-input' focus placeholder='Add a Comment...' />
          </Container>
        </Modal.Description>

      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default PicModal;