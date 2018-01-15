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
      profPic: this.props.user.prof_pic,
      currUser: null,
      iFollowInFollowers: [],
      iFollowInFollowing: []
    };
  }

  componentDidMount() {
    this.followMatches();
  }

  componentWillReceiveProps() {
    this.followMatches();
    this.forceUpdate();
  }

  componentDidUpdate() {
    if (this.props.user.user_id !== this.state.currUser) {
      this.checkIfFollowing();
    }
    if (this.props.user.prof_pic !== this.state.profPic) {
      this.setState({
        profPic: this.props.user.prof_pic
      });
    }
  }

  changeAndReset(userId) {
    this.props.changeUser(userId);
    this.forceUpdate();
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
    this.setState({followed: !this.state.followed});
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length) {
      var image = new FormData();
      image.append('image', acceptedFiles[0]);
      image.append('userId', this.props.loggedInUser.user_id);
      axios.post('/uploadprofimg', image)
        .then((response)=> {
          this.props.newProfPic(response.data);
        })
        .catch(err => {
          console.log('prof pic update failed', err);
        });
    }
  }

  toggleFollow() {

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

  toggleFollowInModal(followOrUnfollow, followThisUser) {

    var bodyObj = {followerId: this.props.loggedInUser.user_id, followedId: followThisUser.user_id};
    bodyObj.status = followOrUnfollow === 'unfollow' ? 'rmFollow' : 'addFollow';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/follow', postConfig);

    bodyObj.status === 'rmFollow'
      ? this.setState({iFollowInFollowers: this.state.iFollowInFollowers.filter(user => user !== followThisUser.name), iFollowInFollowing: this.state.iFollowInFollowing.filter(user => user !== followThisUser.name)})
      : this.setState({iFollowInFollowers: [...this.state.iFollowInFollowers, followThisUser.name], iFollowInFollowing: [...this.state.iFollowInFollowing, followThisUser.name]});
  }

  followMatches() {

    let loggedInUserFollowingNames = this.props.loggedInUser.following.map(following => following.name);
    //followers list
    let currUserFollowerNames = this.props.user.followers.map(follower => follower.name);
    let userFollowsInFollowerList = loggedInUserFollowingNames.filter(name => currUserFollowerNames.includes(name));
    this.setState({iFollowInFollowers: userFollowsInFollowerList});
    //following list
    let currUserFollowingNames = this.props.user.following.map(following => following.name);
    let userFollowsInFollowingList = loggedInUserFollowingNames.filter(name => currUserFollowingNames.includes(name));
    this.setState({iFollowInFollowing: userFollowsInFollowingList});
  }

  render() {
    return (
      <div className='prof-panel-container'>
        <Grid centered>
          <Grid.Column width={4}>
            {
              (this.checkIfSameUser()) 
                ? <Dropzone accept="image/jpeg, image/png, image/gif" className="prof-upload" 
                  maxSize={5000000} onDrop={this.onDrop.bind(this)}>
                  {(this.state.profPic) 
                    ? <img className="prof-avatar self-avatar" src={this.state.profPic} /> 
                    : <p className="prof-pic-absent"> click here to upload <br/> a profile picture </p>
                  }
                </Dropzone> 
                : <img className="prof-avatar" src={this.state.profPic} />
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
                <Modal size="mini" 
                  trigger={
                    <span><span className='profile-sub-data-num'>{this.props.user.followers.length} </span>followers</span>
                  }>
                  <Modal.Header>Followers</Modal.Header>
                  <Modal.Content scrolling>
                    <List divided verticalAlign='middle'>{
                      this.props.user.followers.map((follower) => {
                        return <List.Item onClick={this.changeAndReset.bind(this, follower.user_id)} key={follower.name} className="ff-modal-listItem"><Image avatar src={follower.prof_pic} /><List.Content className="follow">{follower.name}</List.Content><List.Content className="small-button" floated="right">
    
                          {
                            follower.name !== this.props.loggedInUser.name && (
                              this.state.iFollowInFollowers.includes(follower.name)
                                ? <Button size="mini" onClick={this.toggleFollowInModal.bind(this, 'unfollow', follower )} className='follow-button' basic >Following</Button>
                                : <Button size="mini" onClick={this.toggleFollowInModal.bind(this, 'follow', follower )} className='follow-button' primary>Follow</Button>  
                            )
                          }

                        </List.Content></List.Item>;
                      })
                    }</List></Modal.Content></Modal></span>

              <span className='profile-sub-data'>
                <Modal size="mini" 
                  trigger={
                    <span><span className='profile-sub-data-num'>{this.props.user.following.length} </span>following</span>
                  }>
                  <Modal.Header>Following</Modal.Header>
                  <Modal.Content scrolling>
                    <List divided verticalAlign='middle'>{
                      this.props.user.following.map((following) => {
                        return <List.Item onClick={this.changeAndReset.bind(this, following.user_id)} key={following.name} className='ff-modal-listitem'><Image avatar src={following.prof_pic} /><List.Content className="follow">{following.name}</List.Content><List.Content className="small-button" floated="right">
                          {
                            following.name !== this.props.loggedInUser.name && ( 
                              this.state.iFollowInFollowing.includes(following.name)
                                ? <Button size="mini" onClick={this.toggleFollowInModal.bind(this, 'unfollow', following )} className='follow-button' basic>Following</Button>
                                : <Button size="mini" onClick={this.toggleFollowInModal.bind(this, 'follow', following )} className='follow-button' primary>Follow</Button> 
                            )
                          }
                        </List.Content></List.Item>;
                      })
                    }</List></Modal.Content></Modal></span>
            </Grid.Row>

            <Grid.Row>
              <div className='header-caption'>
                {
                  (this.checkIfSameUser()) 
                    ? <DescriptionModal description={this.props.user.description} currUserId={this.props.loggedInUser.user_id}> </DescriptionModal>
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