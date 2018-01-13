import React from 'react';
import { Menu, Modal, Button, Form, Message } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class DescriptionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitFlag: 'not submitted',
      description: this.props.description
    };
    this.insertForm = this.insertForm.bind(this);
  }

  handleSubmit() {
    axios.post('/description', {description: this.state.description, user: this.props.currUser});
    this.setState({
      submitFlag: 'submitted'
    });
  }

  onOpen() {
    this.setState({
      submitFlag: 'not submitted'
    });
  }

  onDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  render() {
    return (
      <Modal className="description-modal" size='small' onOpen={this.onOpen.bind(this)} 
      trigger={<span className="self-description"> {this.state.description} </span>} >
        {this.insertForm(this.state.submitFlag)}
      </Modal>
    );
  }

  insertForm(submitFlag) {
    if (submitFlag === 'not submitted') {
      return (<Form className="description-form" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Input required placeholder='describe yourself!' onChange={this.onDescriptionChange.bind(this)} />
        <Message
          success
          header='Updated!'
        />
        <Button className="description-button">Submit</Button>
      </Form>);
    } else if (submitFlag === 'submitted') {
      return (<Form className="description-form" success>
        <Form.Input required placeholder='describe yourself!' onChange={this.onDescriptionChange.bind(this)} />
        <Message
          success
          header='Updated!'
        />
        <Button className="description-button">Submit</Button>
      </Form>);
    }
  }
}

module.exports = DescriptionModal;