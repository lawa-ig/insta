import React from 'react';
import PictureGrid from './PictureGrid.jsx';
import { Button, Header, List, Image, Divider, Grid, Modal } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import DescriptionModal from './DescriptionModal.jsx';

class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followed: null,
      currUser: null
    };
  }

  componentDidUpdate() {
    if (this.props.user.user_id !== this.state.currUser) {
      this.checkIfFollowing();
    }
  }

  checkIfFollowing() {
    var bodyObj = {followerId: this.props.loggedInUser.user_id, followedId: this.props.user.user_id};
    bodyObj.status = 'checkFollow';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/follow', postConfig)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.rows && jsonRes.rows.length) {
          this.setState({followed: true});
        } else {
          this.setState({followed: false});
        }
      });

    this.setState({currUser: this.props.user.user_id});

  }

  checkIfSameUser() {
    return this.props.loggedInUser.user_id === this.props.user.user_id;
  }

  followUser(e) {
    //POST this.props.user.username to FOLLOWED table
    this.setState({followed: !this.state.followed});
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length) {
      var image = new FormData();
      image.append('image', acceptedFiles[0]);
      image.append('userId', this.state.currUser);
      axios.post('/uploadprofimg', image)
        .catch(err => {
          console.log('prof pic update failed', err);
        });
    }
  }

  toggleFollow() {
    //PUSH picture data into logged in user's liked photos
    var bodyObj = {followerId: this.props.loggedInUser.user_id, followedId: this.props.user.user_id};
    bodyObj.status = this.state.followed ? 'rmFollow' : 'addFollow';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/follow', postConfig);
    this.followUser();

    let {description, name, prof_pic, user_id} = this.props.loggedInUser;
    var loggedInFollowerObj = {
      description: description,
      name: name,
      prof_pic: prof_pic,
      user_id: user_id
    };

    bodyObj.status === 'addFollow' 
      ? this.props.changeFollowersLive(loggedInFollowerObj, 'add') 
      : this.props.changeFollowersLive(loggedInFollowerObj, 'rm');

  }

  render() {
    return (
      <div className='prof-panel-container'>
        <Grid centered>
          <Grid.Column width={4}>
            {
              (this.checkIfSameUser()) 
              ? <Dropzone accept=".jpeg,.png" className="prof-upload" 
                  maxSize={5000000} onDrop={this.onDrop.bind(this)}>
                  {(this.props.user.prof_pic) 
                  ? <img className="prof-avatar" src={this.props.user.prof_pic} /> 
                  : <p> click here to upload <br/> a profile picture </p>
                  }
                </Dropzone> 
              : <img className="prof-avatar" src={this.props.user.prof_pic} />
            }
          </Grid.Column>

          <Grid.Column width={9}>
            <Grid.Row className="first-panel-row">
              <Header className='profile-name-title'>{this.props.user.name}</Header> 
              {
                !(this.checkIfSameUser()) && (
                  (this.state.followed === true) 
                    ? <Button onClick={e => this.followUser(e)} className='follow-button' onClick={e => this.toggleFollow(e)} basic>Following</Button>
                    : <Button onClick={e => this.followUser(e)} className='follow-button' onClick={e => this.toggleFollow(e)} primary>Follow</Button> 
                )
              }
            </Grid.Row>

            <Grid.Row >
              <span className='profile-sub-data'>
                <span className='profile-sub-data-num'>{this.props.user.posts.length}</span> posts </span>
              <span className='profile-sub-data'>
                <Modal size="mini" trigger={<span><span className='profile-sub-data-num'>{this.props.user.followers.length} </span>followers</span>}>
                  <Modal.Header>Followers</Modal.Header>
                  <Modal.Content scrolling><List divided verticalAlign='middle'>{this.props.user.followers.map((follower) => {
                    return <List.Item><Image avatar src={follower.prof_pic} /><List.Content className="follow">{follower.name}</List.Content><List.Content className="small-button" floated="right"><Button color="blue" size="mini">Following</Button></List.Content></List.Item>;
                  })}</List></Modal.Content>
                </Modal></span>
              <span className='profile-sub-data'>
                <Modal size="mini" trigger={<span><span className='profile-sub-data-num'>{this.props.user.following.length} </span>following</span>}>
                  <Modal.Header>Following</Modal.Header>
                  <Modal.Content scrolling><List divided verticalAlign='middle'>{this.props.user.following.map((following) => {
                    return <List.Item><Image avatar src={following.prof_pic} /><List.Content className="follow">{following.name}</List.Content><List.Content className="small-button" floated="right"><Button color="blue" size="mini">Following</Button></List.Content></List.Item>;
                  })}</List></Modal.Content>
                </Modal></span>
            </Grid.Row>

            <Grid.Row>
              <div className='header-caption'>
                {
                  (this.checkIfSameUser()) 
                    ? <DescriptionModal description={this.props.user.description} currUser={this.state.currUser}> </DescriptionModal>
                    : <span > {this.props.user.description} </span> 
                }           
              </div>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
    
  }
}
  
export default ProfilePanel;