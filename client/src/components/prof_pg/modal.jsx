import React from 'react';
import { Comment, Container, Divider, Button, Header, Image, Modal } from 'semantic-ui-react';

const PicModal = (props) => (
  <Modal size='large' trigger={<Image src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />}>
    {/* <Modal.Header>Select a Photo</Modal.Header> */}
    <Modal.Content image>
      <Image size='huge' src='http://cdn.newsapi.com.au/image/v1/cf1189b89fa9c40c5a2c9f4a8bdcbd60' />
      <Modal.Description>
        <Container>
          <Image avatar size='mini' inline src='./assets/fred.png' />
          <Header floated='left'>FredZirdung</Header>
        </Container>
        <Divider />

        <Comment.Group minimal>
          <Comment>
            <Comment.Avatar as='a' src='/assets/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Albert</Comment.Author>
              <Comment.Text>How artistic!</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Modal.Description>

    </Modal.Content>
  </Modal>
);

export default PicModal;