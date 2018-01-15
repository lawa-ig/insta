import React from 'react';
import { Menu, Modal, Button, Form, Message } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitFlag: 'not submitted',
      uploadedFile: null,
      caption: null,
      uploadedFileName: ''
    };
    this.insertForm = this.insertForm.bind(this);
    this.insertFileName = this.insertFileName.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length) {
      this.setState({
        submitFlag: 'invalid file'
      });
    } else {
      console.log(acceptedFiles);
      var image = new FormData();
      image.append('image', acceptedFiles[0]);
      this.setState({
        submitFlag: 'not submitted',
        uploadedFile: image,
        uploadedFileName: acceptedFiles[0].name
      });
    }
  }

  handleSubmit() {
    if (this.state.uploadedFile) {
      this.setState({
        submitFlag: 'submitted'
      });

      this.state.uploadedFile.append('caption', this.state.caption);
      this.state.uploadedFile.append('userId', this.props.loggedInUser.user_id);
      axios.post('/post', this.state.uploadedFile)
        // .then((response) => {
        //   this.props.newUpload(response.data);
        // })
        .catch(err => {
          console.log('image post failed', err);
        });
    } else {
      this.setState({
        submitFlag: 'invalid file'
      })
    }
  }

  insertFileName() {
    if (this.state.uploadedFileName.length) {
      return (<p className="success-filename">{this.state.uploadedFileName}<br/></p>);
    }
  }
  
  onOpen() {
    this.setState({
      submitFlag: 'not submitted',
      uploadedFile: null,
      uploadedFileName: ''
    });
  }

  onCaptionChange(event) {
    this.setState({
      caption: event.target.value
    });
  }

  render() {
    return (
      <Modal className="upload-modal" size='small' onOpen={this.onOpen.bind(this)} trigger={<Menu.Item name='upload' icon='upload' />}>
        <Dropzone 
          acceptStyle={{ background: '#C8E6C9'}} 
          rejectStyle={{ background: '#EF9A9A'}}
          accept="image/jpeg, image/png, image/gif" 
          maxSize={5000000} 
          onDrop={this.onDrop.bind(this)}> 
          <p>Try dropping some files here, or click to select files to upload.</p>
          <p>Only *.jpeg, *.png, *.gif images will be accepted</p><br/>
        </Dropzone>
        {this.insertFileName()}
        {this.insertForm(this.state.submitFlag)}
      </Modal>
    );
  }

  insertForm(submitFlag) {
    if (submitFlag === 'not submitted') {
      return (<Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Input required placeholder='insert caption here' onChange={this.onCaptionChange.bind(this)} />
        <Button>Submit</Button>
      </Form>);
    } else if (submitFlag === 'submitted') {
      return (<Form success>
        <Form.Input required placeholder='insert caption here' onChange={this.onCaptionChange.bind(this)} />
        <Message
          success
          header='Form Completed'
          content="You lawagrammed it up!"
        />
        <Button>Submit</Button>
      </Form>);
    } else if (submitFlag === 'invalid file') {
      return (<Form onSubmit={this.handleSubmit.bind(this)} error>
        <Form.Input required placeholder='insert caption here' onChange={this.onCaptionChange.bind(this)} />
        <Message
          error
          header='Upload Error'
          content="Uhoh! Did you upload a valid file? Please try again with a .jpg or .png under 5MB."
        />
        <Button>Submit</Button>
      </Form>);
    } else {
      return (<Form onSubmit={this.handleSubmit.bind(this)} error>
        <Form.Input required placeholder='insert caption here' onChange={this.onCaptionChange.bind(this)} />
        <Message
          error
          header='Form Error'
          content="Uhoh! Something went wrong."
        />
        <Button>Submit</Button>
      </Form>);
    }
  }
}

module.exports = UploadModal;