import React from 'react';
import CommentsField from './CommentsField.jsx';
import { Input, Rating, Comment, Container, Divider, Button, Header, Image, Modal } from 'semantic-ui-react';

class PicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      postLikes: []
    };
    this.getLikesOnPost(this.props.post.post_id);
    this.checkIfLike();
  }

  getLikesOnPost() {
    var bodyObj = {postId: this.props.post.post_id};
    bodyObj.status = 'getAllLikes';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/like', postConfig)
      .then(data => data.json())
      .then(jsonData => {
        this.setState({postLikes: jsonData.rows});
      });
  }

  changeLikesLive (likerObj, addOrRm) {
    var postLikes = this.state.postLikes;
    
    if (addOrRm === 'add') {
      postLikes.push(likerObj);
      this.setState({postLikes: postLikes});
    } else {
      postLikes = postLikes.filter(like => likerObj.user_id !== like.user_id);
      this.setState({postLikes: postLikes});
    }
  }

  liveUpdateLike() {
    let { postLikes } = this.state;

    let likerObj = {
      user_id: this.props.loggedInUser.user_id,
      name: this.props.loggedInUser.name,
      prof_pic: this.props.loggedInUser.prof_pic
    };
    
    if (this.state.liked) {
      this.changeLikesLive(likerObj, 'rm');        
    } else {
      this.changeLikesLive(likerObj, 'add');
    }
  }

  checkIfLike() {
    var bodyObj = {userId: this.props.loggedInUser.user_id, postId: this.props.post.post_id};
    bodyObj.status = 'checkLike';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/like', postConfig)
      .then(data => data.json())
      .then(jsonData => {
        if (jsonData.rows && jsonData.rows.length) {
          this.setState({liked: true});
        }
      });
  }

  toggleLike() {
    //PUSH picture data into logged in user's liked photos
    var bodyObj = {userId: this.props.loggedInUser.user_id, postId: this.props.post.post_id};

    bodyObj.status = this.state.liked ? 'rmLike' : 'addLike';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/like', postConfig);
    this.liveUpdateLike();
    this.setState({liked: !this.state.liked});

  }

  render() {
    return (
      <Modal size='large' trigger={
        <Image src={this.props.img}/>
      }>
        <Modal.Content image className='pic-modal'>
          <Image className='modal-img' src={this.props.img} />
          <Modal.Description className='modal-description-field'>
            <Container className='modal-header-contain'>
              <Image avatar size='mini' inline src={this.props.user.prof_pic} floated='left' />
              <Header className='uname-modal' size='small' floated='left'>{this.props.user.name}</Header>
            </Container>
            <Divider className='top-div-modal'/>
      
            <CommentsField user={this.props.user} 
              likeCount={this.state.postLikes} 
              post={this.props.post} 
              toggleLike={e => this.toggleLike(e)} 
              isLiked={this.state.liked}
              checkIfLike={this.checkIfLike.bind(this)}/>
      
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

} 

export default PicModal;