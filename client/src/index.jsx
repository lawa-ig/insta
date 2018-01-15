import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import LogIn from './components/LogIn.jsx';
import UserProfile from './components/prof_pg/UserProfile.jsx';
import AllFeeds from './components/main_feed_pg/all_feed.jsx';
import fakeProfileTableData from '../../database/fakeProfileTableData';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false, 
      allUsernames: [], //for dynamic search
      loggedInUser: {user_id: 1, description: ''}, //waiting for login profile name
      onPageForUser: {user_id: 1, description: ''}, //is replaced by a real user on render
      //****************************************************************************/
      currentPg: 'login_page' //<=CHANGE THIS VALUE TO RENDER AND WORK ON YOUR PAGE
      //****************************************************************************/
    };
    this.loginUser = this.loginUser.bind(this);
  }

  componentWillMount() {
    //setup search component
    this.getAllUserNames();

    this.loginUser(2); // trying out a different starting user
    this.changeUser(2);
  }

  getAllUserNames() {
    fetch('/profile')
      .then(data => data.json())
      .then(jsondata => this.setState({allUsernames: jsondata}))
      .catch(err => console.log('error fetching allprofiles'));
  }

  changeFollowersLive (followerObj, addOrRm) {
    var user = this.state.onPageForUser;
    
    if (addOrRm === 'add') {
      user.followers.push(followerObj);
      this.setState({onPageForUser: user});
    } else {
      user.followers = user.followers.filter(follower => followerObj.user_id !== follower.user_id);
      this.setState({onPageForUser: user});
    }

  }

  changeUser(userId) {
    this.mountUser(userId, 'change');
  }

  loginUser(userId) {
    this.mountUser(userId, 'login');
  }

  mountUser(userId, changeOrLogin) {
    //get a specific user's profile - triggered by navbar search
    var bodyObj = {username: userId};
    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    if (changeOrLogin === 'login') {
      fetch('/profile', postConfig)
        .then(data => data.json())
        .then(userDataObj => this.setState({loggedInUser: userDataObj, onPageForUser: userDataObj}));
    } else {
      fetch('/profile', postConfig)
        .then(data => data.json())
        .then(userDataObj => this.setState({onPageForUser: userDataObj}));
    }
  }

  changePage(toPage) {
    if (toPage === 'home') {
      this.setState({currentPg: 'feed'});
    } else if (toPage === 'profile') {
      this.setState({currentPg: 'user_profile'});
      this.changeUser(this.state.onPageForUser.user_id);
    }
  }
  signUp(arr) {
    axios.post('/signUp', {
      email: arr[0].value,
      name: arr[1].value,
      description: ''
    })
      .then((response) => {
        console.log('here is the sign up info', response);
      })
      .catch(function (error) {
        console.log('there was an error', error);
      })
  }
  logIn(e) {
    axios.post('/logon', {
        email: e.value,
    })
      .then(function (response) {
        if (typeof response.data === 'string') {
          alert('Sorry new user, but you need to sign up for Insta-Lawa first!');
        }
      })
      .catch(function (error) {
        console.log('there was an error logging in', error);
      });

    axios.post('/id', {
      email: e.value,
    })
    .then(response => {
      if (typeof response.data === 'string') {
        return;
      }
      this.loginUser(response.data);
      this.changeUser(response.data);
      this.setState({ currentPg: 'user_profile' });
    })
    .catch(function(error) {
      console.log('there was an error with your log in information', error);
    })
  }

  logOut() {
    this.setState({currentPg: 'login_page' });
  }

  newUpload(newPost) {
    this.state.onPageForUser.posts.push(newPost);
    this.setState((prevState) => {
      return {onPageForUser: prevState.onPageForUser.posts};
    });
  }

  newProfPic(profPic) {
    let newState = this.state.onPageForUser;
    newState.prof_pic = profPic;
    this.setState({
      onPageForUser: newState
    });
  }

  pageRouter(currentPg) {
    if (currentPg === 'user_profile') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} 
            allUsers={this.state.allUsernames} 
            changeUser={e => this.changeUser(e)}
            loggedInUser={this.state.loggedInUser} 
            logOut={this.logOut.bind(this)}
            changePage={e => this.changePage(e)}
            newUpload={this.newUpload.bind(this)}
          /> {/* Albert */}
          {this.state.onPageForUser &&
            <UserProfile 
              loggedInUser={this.state.loggedInUser} 
              user={this.state.onPageForUser} 
              changeFollowersLive = {this.changeFollowersLive.bind(this)} 
              newProfPic = {this.newProfPic.bind(this)}
            />
          }
        </div>
      );
    } else if (currentPg === 'login_page') {
      return (
        <LogIn signUp={e => this.signUp(e)} logIn={e => this.logIn(e)}/> //(WILL)
      );
    } else if (currentPg === 'feed') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} 
            changeUser={e => this.changeUser(e)} 
            loggedInUser={this.state.loggedInUser}
            logOut={this.logOut.bind(this)}
            changePage={e => this.changePage(e)}
            newUpload={this.newUpload.bind(this)}
          /> {/* Albert */}
          <AllFeeds user={this.state.loggedInUser} /> {/*Larry*/}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.pageRouter(this.state.currentPg)
        }
      </div>
    );
  }
}


export default App;
