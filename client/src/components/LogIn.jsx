import React from 'react';
import axios from 'axios';
// import config from '../../../server/config.js';



class LogIn extends React.Component {
  constructor(props) {
    super(props);

  }

  logOut(e) {
    axios.get('/logout')
      .then(function(response) {
        console.log('logged out');
      })
      .catch(function(error) {
        console.log('error logging out', error);
      })
  }

  handleClick(e) {
    // perform a get request to server
    axios.get('/login/facebook', {
      params: {
        email: this.email.value,
        password: this.password.value
      }
    })
      .then(function (response) {
        console.log('here is the server response', response);
      })
      .catch(function (error) {
        console.log('there was an error', error);
      });
  }


  render() {

    return (
      <div>
        <a href={'https://www.facebook.com/v2.8/dialog/oauth?client_id=' + process.env.FB_ID + '&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin%2Ffacebook%2Fcallback'}>Log in with Facebook</a>
        <input name='email' ref={(input) => { this.email = input }} placeholder='email...'></input>
        <input name='password' ref={(input) => { this.password = input }} placeholder='password...'></input>
        <button>Sign Up</button>
        <button onClick={(e) => {this.logOut(e)}}>Log Out</button>
      </div>
    );
  }
}

export default LogIn;