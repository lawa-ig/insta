import React from 'react';
import { Input, Comment, Container, List, Button, Divider, Header, Image, Modal } from 'semantic-ui-react';
import SingleComment from './SingleComment.jsx';

class CommentsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: '',
      postComments: this.props.comments
    };
  }

  addComment(content) {

    var bodyObj = {
      userId: this.props.loggedInUser.user_id, 
      postId: this.props.post.post_id,
      text: content,
      status: 'addComment'
    };

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/comment', postConfig)
      .then(res => setTimeout(this.props.getComments, 200));

  }

  rmComment(id) {
    
    var bodyObj = {
      commentId: id,
      status: 'rmComment'
    };

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/comment', postConfig)
      .then(res => setTimeout(this.props.getComments, 200));

  }

  liveUpdateComment(content) {
    this.setState({postComments: [...this.state.postComments, content]});
  }

  onCommentType(e) {
    this.setState({newComment: e.target.value});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.addComment(this.state.newComment);
      this.setState({newComment: ''});
      this.nameInput.value = '';      
    }
  }

  render() {
    return (
      <div>
        {
          ( this.props.comments && this.props.comments.length ) 
            ? (
              <Comment.Group minimal>
                {this.props.comments.map( comment => {
                  return <SingleComment 
                    key={comment.id} 
                    id={comment.id} 
                    comment={comment} 
                    loggedInUserName={this.props.loggedInUser.name}
                    rmComment={this.rmComment.bind(this)} 
                  />;
                })}
              </Comment.Group>
            )
            : this.state.postComments = []
        }
<<<<<<< HEAD
  
        <Modal.Description image className='footer-content'>    
          <Container className='modal-footer-contain'>
            <Divider />
            <Image className="heart-icon" src={this.props.isLiked ? './assets/redheart.png' : './assets/like-icon.png'} onClick={this.props.toggleLike} size='mini' inline/>  
            <Image src="./assets/comment-icon.png" size='mini' inline onClick={() => this.nameInput.focus()}/>                  
            <Header className='likes-text' size='small'>{this.props.likeCount.length} Likes</Header>
            <p className='post-date'> {this.props.post.date} </p>
            <Divider />
            <input 
              type="text"
              ref={input => this.nameInput = input } 
              className='add-comment-input' 
              placeholder='Add a Comment...' 
              onChange={ e => this.onCommentType(e) }
              onKeyPress={ e => this.handleKeyPress(e) }
            />
          </Container>
        </Modal.Description>
      </div>
    );
  }
  
}
=======
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
>>>>>>> readded modal to photo modal and merged fb log in server with index.js server

export default CommentsField;