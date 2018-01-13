import React from 'react';
import axios from 'axios';
import config from '../../../server/config.js';
import { Button, Form, Grid, Header, Image, Icon, Message, Segment } from 'semantic-ui-react'




class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
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
    axios.get('/logon', {
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
    };


  render() {
    <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
    `}</style>
    return (
      // <div>
      //   <a href={'https://www.facebook.com/v2.8/dialog/oauth?client_id=' + config.FACEBOOK_APP_ID + '&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin%2Ffacebook%2Fcallback'}>Log in with Facebook</a>
      //   <input name='email' ref={(input) => { this.email = input }} placeholder='Username or email'></input>
      //   <input name='password' ref={(input) => { this.password = input }} placeholder='Password'></input>
      //   <button>Sign Up</button>
      //   <button onClick={(e) => {this.logOut(e)}}>Log Out</button>
      // </div>
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <img className="logo" src="http://static.tumblr.com/tnhrvnx/SiOm2xuu2/fireythings_flame_logo.jpg" />
            <Header as='h1' color='instagram' textAlign='center'>
                <div className="logo-name" > Instalawa </div>
           </Header>
            <Button color="facebook"><Icon name="facebook" /><a href={'https://www.facebook.com/v2.8/dialog/oauth?client_id=' + config.FACEBOOK_APP_ID + '&redirect_uri=http%3A%2F%2Flocalhost:3000%2Flogin%2Ffacebook%2Fcallback'}>Log in with Facebook</a></Button>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username or email'
                  onChange={(input) => { this.email = input }}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(input) => { this.password = input }}
                />

                <Button color='instagram' onClick={(e) => {this.props.logIn(this.email)}} fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
            {/* will probably get rid of this button  */}
              New to us? <a href='/'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>


    );
  }
}

export default LogIn;

