import React from 'react';
import ProfilePanel from './ProfilePanel.jsx';
import PictureGrid from './PictureGrid.jsx';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followed: false
    };
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
        } 
      });

  }

  render() {
    return (
      <div>
        <ProfilePanel 
          user={this.props.user} 
          followUser={e => this.followUser(e)} 
          loggedInUser={this.props.loggedInUser} 
          followed={this.state.followed}
          changeFollowersLive={this.props.changeFollowersLive} 
          newProfPic={this.props.newProfPic}
          changeUser={this.props.changeUser}
        />
        <PictureGrid user={this.props.user} loggedInUser={this.props.loggedInUser} />
      </div>
    );
  }
} 
  
export default UserProfile;