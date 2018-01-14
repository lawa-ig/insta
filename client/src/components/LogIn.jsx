import React from 'react';
import axios from 'axios';
// import config from '../../../server/config.js';
import { Button, Form, Grid, Header, Image, Modal, Icon, Message, Segment } from 'semantic-ui-react'




class LogIn extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
    `}</style>
    return (
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
            <Form size='large'>
              <Segment stacked>
                <input
                  placeholder='Email'
                  ref={(input) => { this.email = input }}
                />
                <input
                  placeholder='Username'
                  ref={(i) => { this.name = i }}
                />

                <Button color='instagram' onClick={(e) => {this.props.logIn(this.email)}} fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              <Modal trigger={<Button>Sign Up</Button>} closeIcon>
              <Modal.Header>Welcome to Insta-Lawa: Just enter your info to sign up and then log in to see your profile</Modal.Header>
              <Modal.Content>
                <input placeholder='Enter your email' ref={i => {this.newEmail = i }} />
                <input placeholder='Enter your username' ref={i => {this.newUsername = i}} />
                <Button onClick={e => {this.props.signUp([this.newEmail, this.newUsername]) }}>Let's get started</Button>
              </Modal.Content>
            </Modal>
            </Message>
          </Grid.Column>
        </Grid>
      </div>


    );
  }
}

export default LogIn;

