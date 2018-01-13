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
      loggedInUser: fakeProfileTableData[0], //waiting for login profile name
      onPageForUser: null, //is replaced by a real user on render
      //****************************************************************************/
      currentPg: 'user_profile' //<=CHANGE THIS VALUE TO RENDER AND WORK ON YOUR PAGE
      //****************************************************************************/
    };
  }

  componentDidMount() {
    //setup search component
    this.getAllUserNames();

    this.loginUser(1);
    this.changeUser(1);
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
        .then(userDataObj => this.setState({loggedInUser: userDataObj}));
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

  logIn(e) {
    axios.post('/logon', {
        email: e.value
    })
      .then(function (response) {
        console.log('here is the server response', response);
      })
      .catch(function (error) {
        console.log('there was an error', error);
      });
    this.setState({currentPg: 'feed'});
  }

  logOut() {
    this.setState({currentPg: 'login_page' });
  }

  newUpload(newPost) {
    this.setState((prevState) => {
      loggedInUser: prevState.loggedInUser.posts.push(newPost);
    })
  }

  pageRouter(currentPg) {
    if (currentPg === 'user_profile') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} 
<<<<<<< HEAD
            allUsers={this.state.allUsernames} 
            changeUser={e => this.changeUser(e)}
            loggedInUserId={this.state.loggedInUser.user_id} 
=======
            changeUser={e => this.changeUser(e)} 
>>>>>>> log in button now queries for email in database and returns expected results
            logOut={this.logOut.bind(this)}
            changePage={e => this.changePage(e)}
            newUpload={this.newUpload.bind(this)}
          /> {/* Albert */}
          {this.state.onPageForUser &&
            <UserProfile 
              loggedInUser={this.state.loggedInUser} 
              user={this.state.onPageForUser} 
              changeFollowersLive = {this.changeFollowersLive.bind(this)} 
            />
          }
        </div>
      );
    } else if (currentPg === 'login_page') {
      return (
        <LogIn logIn={e => this.logIn(e)}/> //(WILL)
      );
    } else if (currentPg === 'feed') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} 
            changeUser={e => this.changeUser(e)} 
<<<<<<< HEAD
            loggedInUserId={this.state.loggedInUser.user_id}
=======
>>>>>>> log in button now queries for email in database and returns expected results
            logOut={this.logOut.bind(this)}
            changePage={e => this.changePage(e)}
            newUpload={this.newUpload.bind(this)}
          /> {/* Albert */}
          <AllFeeds data={this.state.onPageForUser} /> {/*Larry*/}
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
<<<<<<< HEAD
=======
 

>>>>>>> log in button now queries for email in database and returns expected results

export default App;
ReactDOM.render(<App/>, document.getElementById('app'));
